"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import toast from "react-hot-toast";

export default function HomeSectionContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [token, setToken] = useState("");

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Please complete the CAPTCHA.");
      return;
    }

    const toastId = toast.loading("Sending Your Message...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, token }),
    });

    if (res.ok) {
      toast.success("Message sent!", { id: toastId });
      setToken("");
      reset();
    } else {
      toast.error("Failed to send.", { id: toastId });
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gray-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700 mb-8">
            <span className="text-sm text-gray-300 font-medium">Contact</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Business?
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Let's discuss how I can help you build the digital solution your
            business needs. From initial consultation to final delivery, I'm
            here to drive your success.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 lg:p-12">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative z-10 space-y-8"
            >
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      placeholder="Enter your name"
                      {...register("name", { required: true })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm">Name is required</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      placeholder="Enter your email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email format",
                        },
                      })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <select
                    {...register("service")}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 appearance-none"
                  >
                    <option value="" className="text-gray-500 bg-neutral-50">
                      Select a service
                    </option>
                    <option
                      value="Consultation"
                      className="text-gray-900 bg-neutral-50"
                    >
                      Consultation
                    </option>
                    <option
                      value="SaaS development"
                      className="text-gray-900 bg-neutral-50"
                    >
                      SaaS Development
                    </option>
                    <option
                      value="Wordpress Plugin Development"
                      className="text-gray-900 bg-neutral-50"
                    >
                      WordPress Plugin Development
                    </option>
                    <option
                      value="Website Development"
                      className="text-gray-900 bg-neutral-50"
                    >
                      Website Development
                    </option>
                    <option
                      value="Other"
                      className="text-gray-900 bg-neutral-50"
                    >
                      Other
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Details
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <textarea
                    placeholder="Tell me about your business goals, project requirements, and timeline..."
                    {...register("message", { required: true })}
                    rows={6}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none"
                  />
                </div>
                {errors.message && (
                  <p className="text-red-400 text-sm">Message is required</p>
                )}
              </div>

              {/* CAPTCHA */}
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    onSuccess={setToken}
                    onError={() => setToken("")}
                    onExpire={() => setToken("")}
                    size="flexible"
                    theme="dark"
                    className="w-full"
                    options={{
                      size: "flexible",
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-12 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Start Your Project
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
