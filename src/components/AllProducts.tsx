
import Link from "next/link";
import type { Product } from "@/lib/api";

interface AllProductsProps {
  products: Product[];
}

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

export default function AllProducts({ products }: AllProductsProps) {
  return (
    <section id="সব-পণ্য" className="mt-10 scroll-mt-40">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        সব পণ্য
      </h2>

      <p className="mt-2 text-sm text-gray-600 sm:text-base">
        সকল পণ্যের দাম দেখুন এবং আজকের বাজারদর সম্পর্কে জানুন।
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const direction = product.change?.dir;
          const percentage = product.change?.pct ?? 0;

          const badgeStyle =
            direction === "up"
              ? "bg-red-50 text-red-600"
              : direction === "down"
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-600";

          const changeLabel =
            direction === "up"
              ? `▲ ${bengaliNumber(percentage)}%`
              : direction === "down"
                ? `▼ ${bengaliNumber(percentage)}%`
                : `— ${bengaliNumber(0)}%`;

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <div
                className="flex h-20 items-center justify-center rounded-xl bg-emerald-50 text-5xl"
                aria-hidden="true"
              >
                {product.image}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {product.nameBn}
              </h3>

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
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${badgeStyle}`}
                >
                  {changeLabel}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {products.length === 0 && (
        <p className="mt-6 rounded-xl bg-gray-50 p-6 text-center text-gray-600">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}

