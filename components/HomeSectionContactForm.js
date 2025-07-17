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
        <div className="">
            <div className="max-w-3xl mx-auto py-10 lg:py-20 bg-neutral px-4">
                <h2 className="text-3xl text-neutral-100 text-center mb-10">
                    Get in touch
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-4"
                >
                    <label className="input validator w-full">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                className="stroke-white"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            placeholder="Name"
                            {...register("name", { required: true })}
                            className="text-white"
                        />
                        {errors.name && (
                            <p className="text-red-500">Name is required</p>
                        )}
                    </label>
                    <label className="input validator w-full">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                className="stroke-white"
                            >
                                <rect
                                    width="20"
                                    height="16"
                                    x="2"
                                    y="4"
                                    rx="2"
                                ></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input
                            placeholder="Email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                },
                            })}
                            className="text-white"
                        />
                        {errors.email && (
                            <p className="text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </label>
                    <select
                        {...register("service")}
                        className="select w-full text-white/50 bg-base-100  border-base-content/20"
                    >
                        <option disabled={true}>Select a service</option>
                        <option>Website Development</option>
                        <option>Consultation</option>
                        <option>SaaS development</option>
                        <option>Wordpress Plugin Development</option>
                        <option>Other</option>
                    </select>
                    <textarea
                        placeholder="Message"
                        {...register("message", { required: true })}
                        className="textarea textarea-md w-full text-white h-40"
                    />
                    {errors.message && (
                        <p className="text-red-500">Message is required</p>
                    )}

                    <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} // Note: siteKey (not sitekey)
                        onSuccess={setToken}
                        onError={() => setToken("")}
                        onExpire={() => setToken("")}
                        size="flexible"
                        theme="auto"
                        className="w-full"
                        options={{
                            size: "flexible", // Additional size control
                        }}
                    />

                    <button
                        type="submit"
                        className="btn btn-accent"
                        disabled={isSubmitting}
                    >
                        Send me a Message!
                    </button>
                </form>
            </div>
        </div>
    );
}
