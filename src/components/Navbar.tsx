
"use client";

import { getCategories, type Category } from "@/lib/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [date, setDate] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const today = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setDate(today);

    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }

    loadCategories();
  }, []);

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
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl">
            🛒
          </span>

          <span>
            <span className="block text-xl font-extrabold text-emerald-800">
              বাজার দর
            </span>
            <span className="block text-xs text-gray-500">
              {date || "আজকের বাজার"}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {!isPending && session ? (
            <>
              <Link
                href="/profile"
                className="rounded-xl border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </button>
            </>
          ) : !isPending ? (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                সাইন আপ
              </Link>
            </>
          ) : (
            <span className="text-sm text-gray-500">লোড হচ্ছে...</span>
          )}
        </div>
      </div>

      <nav className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
          <Link
            href="/"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              pathname === "/"
                ? "bg-emerald-600 text-white"
                : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            🛒 সব পণ্য
          </Link>

          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const active = pathname === href;

            return (
              <Link
                key={category.id}
                href={href}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                {category.icon} {category.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

