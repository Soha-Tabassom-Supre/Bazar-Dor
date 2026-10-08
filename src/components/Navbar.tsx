"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
{ slug: "all", name: "সব পণ্য", icon: "🛒" },
{ slug: "chal", name: "চাল", icon: "🍚" },
{ slug: "dal", name: "ডাল", icon: "🫘" },
{ slug: "tel", name: "তেল", icon: "🛢️" },
{ slug: "sobji", name: "সবজি", icon: "🥬" },
{ slug: "mach", name: "মাছ", icon: "🐟" },
{ slug: "mangsho", name: "মাংস", icon: "🍗" },
{ slug: "dim-dui", name: "ডিম-দুধ", icon: "🥛" },
{ slug: "mosla", name: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
const pathname = usePathname();
const [date, setDate] = useState("");

useEffect(() => {
const today = new Intl.DateTimeFormat("bn-BD", {
day: "numeric",
month: "long",
year: "numeric",
}).format(new Date());

setDate(today);


}, []);

return ( <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white shadow-sm"> <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3"> <Link href="/" className="flex items-center gap-3"> <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl">
🛒 </span>

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
      <Link
        href="/signin"
        className="rounded-xl border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        সাইন আপ
      </Link>
    </div>
  </div>

  <nav className="border-t border-gray-100">
    <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
      {categories.map((category) => {
        const href =
          category.slug === "all"
            ? "/"
            : `/category/${category.slug}`;

        const active =
          category.slug === "all"
            ? pathname === "/"
            : pathname === href;

        return (
          <Link
            key={category.slug}
            href={href}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-emerald-600 text-white"
                : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            {category.icon} {category.name}
          </Link>
        );
      })}
    </div>
  </nav>
</header>


);
}
