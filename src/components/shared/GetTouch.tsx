import Head from "next/head";
import React from "react";
import CustomButton from "./CustomButton";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="bg-gray-100 py-10 " id="contact">
      <Head>
        <title>Pixelspiece</title>
      </Head>
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 text-primary-main">
          Get in Touch
        </h1>
        <p className="text-gray-700 mt-2">
          We’d love to hear from you! Fill out the form below or reach out to us
          directly.
        </p>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 mx-auto md:grid-cols-1 w-full lg: xl:w-[50%]">
          {/* Contact Form */}
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  id="name"
                  name="name"
                  value={result.name}
                  className="w-full mt-2 p-2 border border-pink-300 rounded-md focus:outline-none"
                  placeholder="Your Name"
                  required
                />
                {errors.name && (
                  <p className="text-error-main text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  id="email"
                  name="email"
                  value={result.email}
                  className="w-full mt-2 p-2 border border-pink-300 rounded-md  focus:outline-none"
                  placeholder="Your Email"
                  required
                />
                {errors.email && (
                  <p className="text-error-main text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  value={result.message}
                  rows={4}
                  className="w-full mt-2 p-2 border border-pink-300 rounded-md  focus:outline-none"
                  placeholder="Your Message"
                  required
                ></textarea>
                {errors.message && (
                  <p className="text-error-main text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <CustomButton
                type="submit"
                className="w-fit text-white py-2 rounded-md flex items-center justify-center"
                name={loading ? "Submitting..." : "Submit"}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                
              </CustomButton>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetTouch;
