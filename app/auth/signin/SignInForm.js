"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function SignInForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const allowedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const onSubmit = async (data) => {
    setSubmitted(false);
    setEmailError("");
    if (allowedEmail && data.email !== allowedEmail) {
      setEmailError("This email is not registered for admin access.");
      return;
    }
    const res = await signIn("resend", {
      email: data.email,
      redirect: false,
      callbackUrl: "/admin"
    });
    if (res?.ok) {
      setSubmitted(true);
      toast.success("Check your email for a login link!");
    } else {
      toast.error("Failed to send magic link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        {submitted ? (
          <div className="text-green-600 text-center mb-4">Check your email for a login link!</div>
        ) : null}
        <input
          type="email"
          placeholder="Your email address"
          {...register("email", { required: true })}
          className="input input-bordered w-full mb-4 bg-white border-neutral"
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-red-500 mb-2">Email is required</p>}
        {emailError && <p className="text-red-500 mb-2">{emailError}</p>}
        <button type="submit" className="btn btn-accent w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
}
