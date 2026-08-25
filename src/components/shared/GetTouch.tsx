import React from "react";
import CustomButton from "./CustomButton";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import { FadeIn, SlideIn, SplitReveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { GlowOrb, SoftBand } from "@/components/shared/backgrounds";

// Every field shares one class string so focus/hover/placeholder behaviour can
// never drift between them. The explicit background matters: with only a border
// set, the browser paints its own dark-mode control colour (a muddy grey) that
// has nothing to do with the site palette.
const FIELD_CLASS =
  "w-full mt-2 rounded-xl border border-black-300 bg-common-white px-4 py-3 text-[15px] text-common-black placeholder:text-black-500 outline-none transition-colors duration-200 focus:border-primary-main focus:ring-2 focus:ring-primary-main/30";

const CONTACT_DETAILS = [
  {
    icon: <ForwardToInboxIcon fontSize="small" />,
    label: "Email",
    value: "darshit@pixelspiece.com",
    href: "mailto:darshit@pixelspiece.com",
  },
  {
    icon: <LocalPhoneIcon fontSize="small" />,
    label: "Phone",
    value: "+91 9377098863",
    href: "tel:+919377098863",
  },
  {
    icon: <PlaceIcon fontSize="small" />,
    label: "Studio",
    value: "906 Silver trade center, Mota Varachha, Surat, Gujarat 394101",
    href: null,
  },
];

const GetTouch = () => {
  const [result, setResult] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  // Add loading state
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", message: "" };

    if (!result.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!result.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(result.email)
    ) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (!result.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResult({
      ...result,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true); // Start loader

    const serviceId = "service_r75axlk";
    const templateId = "template_sejbium";
    const public_key = "68lrtY3HdMINwwQT0";
    const templateParams = {
      from_name: result.name,
      to_name: "Pixelspiece",
      message: result.message,
      reply_to: result.email,
    };

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        public_key
      );
      if (response.status === 200) {
        toast.success("your message has been submit successfully!");
        setResult({ name: "", email: "", message: "" });
      } else {
        toast.error("your message has not been submit!");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <section
      className="relative overflow-hidden py-[70px]"
      id="contact"
      aria-labelledby="contact-heading"
    >
      {/* The tint rides its own feathered layer, never the <section>: `band-soft`
          masks every painted descendant, so on the section it would fade the
          heading and the form out along with the band. */}
      <SoftBand className="bg-black-100/50" />
      <GlowOrb color="blue" size={620} className="left-1/2 top-0 -translate-x-1/2" />
      {/* No <ToastContainer> here. This section renders inside <Wrapper>, and
          so inside ScrollSmoother's transformed #smooth-content, where the
          container's `position: fixed` stops being fixed and the toast would
          scroll away with the page. The single container lives in _app.tsx as
          a sibling of <Wrapper>, carrying this section's original
          `position="top-right" autoClose={3000}`; the toast.success/error
          calls above reach it unchanged. */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-5 w-[100px] border-2 border-pink-500"
          />
          <h2
            id="contact-heading"
            className="font-display text-[30px] font-bold tracking-tight text-common-black md:text-[40px]"
          >
            <SplitReveal text="Get in Touch" />
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] text-black-700 md:text-[17px]">
            We&rsquo;d love to hear from you. Tell us what you&rsquo;re building and
            we&rsquo;ll get back to you within one business day.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Contact details */}
          <SlideIn from="left">
            <Stagger className="flex h-full flex-col gap-4">
              {CONTACT_DETAILS.map((item) => {
                const body = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black-200 bg-common-white text-primary-main">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-medium uppercase tracking-wide text-black-600">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block break-words text-[15px] font-medium text-common-black">
                        {item.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <StaggerItem key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-4 rounded-2xl border border-black-200 bg-common-white p-5 shadow-sm transition-colors duration-200 hover:border-primary-main"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-2xl border border-black-200 bg-common-white p-5 shadow-sm">
                        {body}
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </SlideIn>

          {/* Contact form */}
          <SlideIn from="right" delay={0.1}>
            <div className="rounded-2xl border border-black-200 bg-common-white p-6 shadow-lg md:p-8">
              <form noValidate>
                <div className="mb-5">
                  <label htmlFor="name" className="block text-[14px] font-semibold text-common-black">
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    id="name"
                    name="name"
                    value={result.name}
                    className={FIELD_CLASS}
                    placeholder="Your Name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    required
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-[13px] text-error-main">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block text-[14px] font-semibold text-common-black">
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={handleChange}
                    id="email"
                    name="email"
                    value={result.email}
                    className={FIELD_CLASS}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-[13px] text-error-main">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-[14px] font-semibold text-common-black">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    value={result.message}
                    rows={5}
                    className={`${FIELD_CLASS} resize-y`}
                    placeholder="Tell us about your project…"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-[13px] text-error-main">
                      {errors.message}
                    </p>
                  )}
                </div>

                <CustomButton
                  type="submit"
                  className="w-full rounded-xl py-3 text-static-white"
                  name={loading ? "Sending…" : "Send message"}
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <svg
                        className="h-4 w-4 animate-spin text-static-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    ) : null
                  }
                />
              </form>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

export default GetTouch;
