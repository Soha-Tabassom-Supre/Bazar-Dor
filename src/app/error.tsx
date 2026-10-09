
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
        ⚠️
      </div>

      <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
        কিছু একটা সমস্যা হয়েছে!
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
        দুঃখিত, পেজটি লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।
      </p>

      {error.digest && (
        <p className="mt-2 text-xs text-gray-400">
          Error ID: {error.digest}
        </p>
      )}

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        আবার চেষ্টা করুন
      </button>
    </section>
  );
}

