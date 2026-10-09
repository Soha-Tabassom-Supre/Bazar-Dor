
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "low-high" | "high-low";

const bengaliNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

function getUnitLabel(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    unit: "পিস",
  };

  return units[unit.toLowerCase()] ?? unit;
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section className="mt-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-600">
          মোট {bengaliNumber(sortedProducts.length)}টি পণ্য
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="category-sort"
            className="shrink-0 text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
          <p className="text-gray-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => {
            const direction = product.change?.dir;
            const percentage = product.change?.pct ?? 0;

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-20 items-center justify-center rounded-xl bg-emerald-50 text-5xl">
                  {product.image}
                </div>

                <h2 className="mt-3 text-lg font-semibold text-gray-900">
                  {product.nameBn}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  প্রতি {getUnitLabel(product.unit)}
                </p>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-500">আজকের দাম</p>
                    <p className="mt-1 text-xl font-extrabold text-emerald-700">
                      {bengaliNumber(product.today)} টাকা
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      direction === "up"
                        ? "bg-red-50 text-red-600"
                        : direction === "down"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {direction === "up"
                      ? "▲"
                      : direction === "down"
                        ? "▼"
                        : "—"}{" "}
                    {bengaliNumber(percentage)}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

