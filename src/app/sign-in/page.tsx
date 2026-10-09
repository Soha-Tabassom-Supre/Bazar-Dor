"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  function getDestination() {
    const callbackURL = new URLSearchParams(window.location.search).get(
      "callbackURL",
    );

    return callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({ email, password });

      if (result.error) {
        const message =
          result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push(getDestination());
      router.refresh();
    } catch (err) {
      console.error("Email sign-in failed:", err);

      const message = "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: getDestination(),
      });

      if (result.error) {
        console.error(`${provider} sign-in returned an error:`, result.error);

        const message = result.error.message || "সোশ্যাল সাইন ইন করা যায়নি।";

        setError(message);
        toast.error(message);
        setSocialLoading("");
      }
      // On success, Better Auth redirects the browser to the provider.
      // Keep the loading state active while the redirect starts.
    } catch (err) {
      console.error(`${provider} sign-in threw an exception:`, err);

      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12 text-gray-900">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← বাজার দরে ফিরে যান
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold">সাইন ইন করুন</h1>

        <p className="mt-2 text-sm text-gray-600">
          আপনার BazarDor অ্যাকাউন্টে প্রবেশ করুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-600"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "ইমেইল দিয়ে সাইন ইন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={loading || !!socialLoading}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold transition hover:bg-gray-50 disabled:opacity-60"
          >
            {socialLoading === "google"
              ? "Google দিয়ে সাইন ইন হচ্ছে..."
              : "Google দিয়ে সাইন ইন করুন"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={loading || !!socialLoading}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 font-semibold transition hover:bg-gray-50 disabled:opacity-60"
          >
            {socialLoading === "github"
              ? "GitHub দিয়ে সাইন ইন হচ্ছে..."
              : "GitHub দিয়ে সাইন ইন করুন"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-emerald-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
