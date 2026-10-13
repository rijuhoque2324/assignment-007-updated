"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import SocialLogin from "./SocialLogin";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const formData = new FormData(e.target);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!")
         router.replace("/")
         router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করুন সব ফিচার ব্যবহার করতে।
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm">
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="যেমন: রহিম উদ্দিন"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            placeholder="আবার লিখুন"
            className="w-full rounded-lg border border-gray-200 p-3 outline-green-600"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-green-700 py-3 font-medium text-white hover:bg-green-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <SocialLogin />

        <p className="text-center text-sm text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-medium text-green-700 hover:text-green-800"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
        >
          <span>←</span>
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;