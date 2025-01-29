import Head from "next/head";
import React from "react";
import CustomButton from "./CustomButton";

const GetTouch = () => {
  return (
    <div className="bg-gray-100 py-10 " id="contact">
      <Head>
        <title>PixelPiece</title>
      </Head>
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
                  id="name"
                  name="name"
                  className="w-full mt-2 p-2 border border-pink-300 rounded-md focus:outline-none"
                  placeholder="Your Name"
                  required
                />
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
                  id="email"
                  name="email"
                  className="w-full mt-2 p-2 border border-pink-300 rounded-md  focus:outline-none"
                  placeholder="Your Email"
                  required
                />
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
                  rows={4}
                  className="w-full mt-2 p-2 border border-pink-300 rounded-md  focus:outline-none"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <CustomButton
                type="submit"
                className="w-fit  text-white py-2 rounded-md "
                name="Submit"
              >
                Submit
              </CustomButton>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetTouch;
