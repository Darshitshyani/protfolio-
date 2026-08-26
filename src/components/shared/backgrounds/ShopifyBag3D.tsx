import * as React from "react";
import { ShopifyLogo } from "@/untils/images";

/**
 * The real Shopify bag mark, standing in 3D space and scrubbed to scroll.
 *
 * ── WHY A TEXTURED SLAB, NOT EXTRUDED GEOMETRY ────────────────────────────
 * The previous attempt rebuilt the bag silhouette as a hand-written polygon and
 * extruded it. It did not look like the mark — approximating a logo by hand is
 * a losing game, and the fan triangulation it relied on only holds for
 * star-shaped outlines anyway.
 *
 * This uses the ACTUAL artwork instead: src/untils/images/shopify.svg is the
 * genuine three-path bag (lime body #95BF47, shadowed side #5E8E3E, white S),
 * rasterised to a canvas at runtime and used as a texture on a plane that tilts
 * in perspective. The shape is exact rather than approximated.
 *
 * A BOX was tried first and looked broken: its four side faces stay rectangular
 * while the front face is alpha-cut to the bag silhouette, so at an angle you
 * saw a full rectangular slab edge attached to a bag-shaped face. A plane has
 * no edge geometry to disagree with the cut-out.
 *
 * Alpha is DISCARDED, not blended. On a double-sided unsorted mesh, blended
 * alpha draws fragments in arbitrary order, which produced ghosting and ragged
 * edges. Discard gives a hard silhouette with no order dependency.
 *
 * ── WHY RASTERISE TO A CANVAS ─────────────────────────────────────────────
 * WebGL cannot take an SVG element as a texture source, and an <img> pointing
 * at an SVG has no intrinsic pixel size to upload. Drawing it to a 512² canvas
 * first gives a concrete bitmap and keeps the mark crisp at any on-screen size.
 *
 * Reduced motion: one static frame at a slight angle, no rAF loop.
 */

export interface ShopifyBag3DProps {
  className?: string;
  cameraZ?: number;
}

const ShopifyBag3D = ({ className = "", cameraZ = 3.4 }: ShopifyBag3DProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let raf: number | null = null;
    let cleanupFns: Array<() => void> = [];

    const start = async () => {
      // Rasterise the real SVG to a bitmap before touching WebGL.
      const logo = await new Promise<HTMLCanvasElement | null>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const SIZE = 512;
          const c = document.createElement("canvas");
          c.width = SIZE;
          c.height = SIZE;
          const ctx = c.getContext("2d");
          if (!ctx) return resolve(null);
          // The source viewBox is 152x192 (taller than wide) — fit it centred
          // so the mark keeps its proportions instead of stretching.
          const ar = 152 / 192;
          const h = SIZE * 0.82;
          const w = h * ar;
          ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
          resolve(c);
        };
        img.onerror = () => resolve(null);
        img.src = typeof ShopifyLogo === "string" ? ShopifyLogo : ShopifyLogo.src;
      });
      if (disposed || !logo) return;

      const { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } = await import("ogl");
      if (disposed) return;

      const renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";
      container.appendChild(gl.canvas);

      const camera = new Camera(gl, { fov: 35 });
      camera.position.set(0, 0, cameraZ);
      const scene = new Transform();

      const texture = new Texture(gl, {
        image: logo,
        generateMipmaps: true,
        // Trilinear + max anisotropy: the mark is viewed at a steep angle for
        // much of the spin, which is exactly where a default sampler aliases
        // into the stair-stepped edges.
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
        magFilter: gl.LINEAR,
      });
      const aniso = gl.getExtension("EXT_texture_filter_anisotropic");
      if (aniso) {
        gl.bindTexture(gl.TEXTURE_2D, texture.texture);
        gl.texParameterf(
          gl.TEXTURE_2D,
          aniso.TEXTURE_MAX_ANISOTROPY_EXT,
          gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        );
      }

      // A PLANE, not a box. A box has four rectangular side faces, but the
      // front face is alpha-cut to the bag silhouette — so at an angle you saw
      // a full rectangular slab edge attached to a bag-shaped face, which is
      // what made it look broken. A plane has no edge geometry to disagree with
      // the cut-out.
      const geometry = new Plane(gl, { width: 1.6, height: 2.0 });

      const program = new Program(gl, {
        transparent: true,
        cullFace: null,
        vertex: /* glsl */ `
          attribute vec3 position;
          attribute vec3 normal;
          attribute vec2 uv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform mat3 normalMatrix;
          varying vec3 vNormal;
          varying vec3 vViewPos;
          varying vec2 vUv;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vUv = uv;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vViewPos = -mv.xyz;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragment: /* glsl */ `
          precision highp float;
          varying vec3 vNormal;
          varying vec3 vViewPos;
          varying vec2 vUv;
          uniform sampler2D tMap;
          uniform float uAlpha;

          void main() {
            vec3 nrm = normalize(vNormal);
            vec3 v = normalize(vViewPos);

            vec4 tex = texture2D(tMap, vUv);

            // DISCARD rather than blend. With a double-sided, unsorted mesh,
            // blended alpha draws fragments in arbitrary order — that is what
            // produced the ghosting and ragged edges. Discarding gives a hard,
            // clean silhouette with no order dependency.
            if (tex.a < 0.5) discard;
            vec3 base = tex.rgb;

            // Light whichever side is facing the camera, so the back of the
            // plane is lit too instead of going flat black mid-spin.
            if (!gl_FrontFacing) nrm = -nrm;
            vec3 lightDir = normalize(vec3(-0.35, 0.7, 0.75));
            float diff = clamp(dot(nrm, lightDir), 0.0, 1.0);
            vec3 color = base * (0.62 + 0.5 * diff);

            // Fresnel rim lifts the silhouette off a dark page.
            float fres = pow(1.0 - clamp(dot(nrm, v), 0.0, 1.0), 2.5);
            color += vec3(0.62, 0.92, 0.72) * fres * 0.35;

            gl_FragColor = vec4(color, uAlpha);
          }
        `,
        uniforms: { tMap: { value: texture }, uAlpha: { value: 0.96 } },
      });

      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);

      const resize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h);
        camera.perspective({ aspect: w / h });
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);
      cleanupFns.push(() => ro.disconnect());

      let targetSpin = 0;
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        // A plane has no thickness, so a full revolution passes through a
          // moment where it disappears entirely. Sweep within +/-52 degrees.
          targetSpin = (p - 0.5) * 1.85;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanupFns.push(() => window.removeEventListener("scroll", onScroll));

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        mesh.rotation.y = -0.4;
        mesh.rotation.x = 0.12;
        renderer.render({ scene, camera });
      } else {
        let spin = targetSpin;
        let idle = 0;
        const update = () => {
          raf = requestAnimationFrame(update);
          // Lerp toward the scroll target so the wheel does not jitter it.
          spin += (targetSpin - spin) * 0.06;
          idle += 0.005;
          mesh.rotation.y = spin + Math.sin(idle) * 0.22;
          mesh.rotation.x = Math.sin(idle * 0.6) * 0.14;
          renderer.render({ scene, camera });
        };
        raf = requestAnimationFrame(update);
      }

      cleanupFns.push(() => {
        if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      });
    };

    // WebGL and canvas rasterisation must never run during SSR; failures just
    // leave the page without the shape.
    start().catch(() => {});

    return () => {
      disposed = true;
      if (raf !== null) cancelAnimationFrame(raf);
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
    };
  }, [cameraZ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
};

export default ShopifyBag3D;
