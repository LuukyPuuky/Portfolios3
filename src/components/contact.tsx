"use client";

import { useState } from "react";
// import AnimatedLink from "./AnimatedLink";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const form = e.currentTarget as HTMLFormElement;

      // Convert form data to typed object
      const formData = new FormData(form);
      const payload: ContactFormData = {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        message: formData.get("message")?.toString() || "",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        setStatus(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-between bg-neutral-900 text-white px-8 md:p-16 p-16 lg:py-24">
      <div className="max-w-7xl w-full mx-auto">
        <h1 className="text-4xl lg:text-7xl font-light leading-base max-w-3xl mb-20 ">
          Get in touch. I&#39;d love to hear from you.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-7 w-full max-w-lg"
          >
            <h3 className="text-lg font-light tracking-wide">
              Send me a message
            </h3>

            <div className="flex gap-10 flex-col md:flex-row">
              <div className="w-full flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide opacity-60">
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="bg-transparent border-b border-zinc-700 focus:border-white transition-colors outline-none text-sm py-2"
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide opacity-60">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="bg-transparent border-b border-zinc-700 focus:border-white transition-colors outline-none text-sm py-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide opacity-60">
                Your message...
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="bg-transparent border-b border-zinc-700 focus:border-white transition-colors outline-none text-sm py-2 resize-none"
              />
            </div>

            <button
              type="submit"
              className="text-sm border border-zinc-700 hover:border-white transition-all px-6 py-2 rounded-sm w-fit"
            >
              Submit
            </button>

            {status && <p className="text-xs opacity-70">{status}</p>}
          </form>

          <div className="md:flex flex-col gap-2 text-sm hidden">
            <h3 className="text-lg font-light tracking-wide mb-2">
              Get in touch
            </h3>

            <a href="mailto:luukwillem@gmail.com">luukwillem@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
