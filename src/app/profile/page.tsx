
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const result = await signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/sign-in");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-gray-600">
        প্রোফাইল লোড হচ্ছে...
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-gray-900">
        <h1 className="text-2xl font-bold">আপনি সাইন ইন করেননি</h1>
        <p className="text-gray-600">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>
        <Link
          href="/sign-in"
          className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          সাইন ইন করুন
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-12 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← বাজার দরে ফিরে যান
        </Link>

        <section className="mt-6 rounded-3xl border border-gray-100 p-8 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
            {(session.user.name || session.user.email)
              .charAt(0)
              .toUpperCase()}
          </div>

          <h1 className="mt-5 text-3xl font-extrabold">
            আপনার প্রোফাইল
          </h1>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500">নাম</p>
              <p className="mt-1 font-semibold">
                {session.user.name || "নাম দেওয়া হয়নি"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">ইমেইল</p>
              <p className="mt-1 font-semibold">{session.user.email}</p>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="mt-6 inline-block rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Update Information
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-4 block rounded-xl border border-gray-200 px-5 py-3 font-semibold hover:bg-gray-50 disabled:opacity-60"
          >
            {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </section>
      </div>
    </main>
  );
}

