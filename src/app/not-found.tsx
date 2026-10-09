
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 text-center">
      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-50 text-5xl">
        🛒
      </div>

      <p className="text-6xl font-extrabold text-emerald-600">404</p>

      <h1 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি অথবা সরিয়ে ফেলা হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        🏠 হোমপেজে ফিরে যান
      </Link>
    </section>
  );
}

