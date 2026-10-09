
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl bg-emerald-50">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <span className="inline-block rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
            বাংলাদেশের নিত্যপ্রয়োজনীয় বাজার
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            নিত্যপ্রয়োজনীয় পণ্যের
            <span className="block text-emerald-700">
              সঠিক বাজারদর জানুন
            </span>
          </h1>

          <p className="mt-4 max-w-lg leading-7 text-gray-600">
            চাল, ডাল, তেল, মাছ, মাংস ও অন্যান্য পণ্যের আজকের দাম
            এক নজরে দেখুন। বাজার করুন আরও সচেতনভাবে।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            সব পণ্য দেখুন <span aria-hidden="true">↓</span>
          </Link>
        </div>

        <div className="relative flex min-h-64 items-center justify-center p-6 sm:min-h-80 md:min-h-full">
          <div className="absolute h-56 w-56 rounded-full bg-emerald-100 sm:h-72 sm:w-72" />

          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
            alt="তাজা শাকসবজি ও নিত্যপ্রয়োজনীয় বাজারের পণ্য"
            className="relative h-64 w-full max-w-md rounded-2xl object-cover shadow-lg sm:h-80"
          />

          <div className="absolute bottom-3 left-5 rounded-xl bg-white/95 px-4 py-3 shadow-md sm:bottom-6 sm:left-8">
            <p className="text-sm text-gray-500">আজকের বাজার</p>
            <p className="font-bold text-emerald-700">
              দাম জানুন, বুঝে কিনুন
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

