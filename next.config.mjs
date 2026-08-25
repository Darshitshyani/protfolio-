/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * /shopify-app was the PIMW-only product page. It has been superseded by
   * /shopify-apps, which covers all four apps with their full features and
   * pricing, so the old route is retired with a permanent (308) redirect.
   *
   * This is the ONLY place the redirect lives — no client-side redirect
   * component ships alongside it. Internal links should point straight at
   * /shopify-apps (or a section anchor such as /shopify-apps#pimw) so they
   * never bounce through this hop.
   */
  async redirects() {
    return [
      {
        source: "/shopify-app",
        destination: "/shopify-apps",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
