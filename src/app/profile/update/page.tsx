
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length > 100) {
      toast.error("নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে।");
      return;
    }

    setSaving(true);

    try {
      const result = await updateUser({ name: trimmedName });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-gray-600">
        তথ্য লোড হচ্ছে...
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-gray-900">
        <h1 className="text-2xl font-bold">আপনি সাইন ইন করেননি</h1>
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
          href="/profile"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>

        <section className="mt-6 rounded-3xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold">
            Update Information
          </h1>
          <p className="mt-2 text-gray-600">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                আপনার নাম
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
                autoComplete="name"
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">ইমেইল</p>
              <p className="mt-1 font-medium">{session.user.email}</p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "Update Information"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

