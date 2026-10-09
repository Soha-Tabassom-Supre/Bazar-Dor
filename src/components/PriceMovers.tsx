import Link from "next/link";
import type { Product } from "@/lib/api";

interface PriceMoversProps {
products: Product[];
}

const bnNumber = (value: number) =>
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

function getPriceChange(product: Product) {
if (product.today < product.yesterday) {
return {
direction: "down" as const,
percentage:
product.yesterday > 0
? ((product.yesterday - product.today) / product.yesterday) * 100
: 0,
};
}

if (product.today > product.yesterday) {
return {
direction: "up" as const,
percentage:
product.yesterday > 0
? ((product.today - product.yesterday) / product.yesterday) * 100
: 0,
};
}

return {
direction: product.change?.dir === "up" ? ("up" as const) : ("down" as const),
percentage: product.change?.pct ?? 0,
};
}

function PriceList({
title,
products,
direction,
}: {
title: string;
products: Product[];
direction: "up" | "down";
}) {
const isUp = direction === "up";

return (
<section
className={`rounded-2xl border p-4 sm:p-5 ${
        isUp
          ? "border-red-100 bg-red-50/40"
          : "border-green-100 bg-green-50/40"
      }`}
>
<h2
className={`text-xl font-bold ${
          isUp ? "text-red-700" : "text-green-700"
        }`}
>
{title} </h2>


  <div className="mt-4 space-y-2">
    {products.length === 0 ? (
      <p className="text-sm text-gray-600">
        এই মুহূর্তে কোনো তথ্য পাওয়া যায়নি।
      </p>
    ) : (
      products.map((product) => {
        const change = getPriceChange(product);

        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="flex items-center gap-3 rounded-xl bg-white p-3 transition hover:shadow-sm"
          >
            <span className="text-2xl" aria-hidden="true">
              {product.image}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold text-gray-900">
                {product.nameBn}
              </span>
              <span className="text-sm text-gray-500">
                ৳{bnNumber(product.today)}/{getUnitLabel(product.unit)}
              </span>
            </span>

            <span
              className={`shrink-0 text-sm font-bold ${
                isUp ? "text-red-600" : "text-green-600"
              }`}
            >
              {isUp ? "▲" : "▼"} {bnNumber(change.percentage)}%
            </span>
          </Link>
        );
      })
    )}
  </div>
</section>

);
}

export default function PriceMovers({ products }: PriceMoversProps) {
const rising = products
.filter((product) => product.today > product.yesterday)
.sort((a, b) => {
const aChange = getPriceChange(a).percentage;
const bChange = getPriceChange(b).percentage;
return bChange - aChange;
})
.slice(0, 6);

const falling = products
.filter((product) => product.today < product.yesterday)
.sort((a, b) => {
const aChange = getPriceChange(a).percentage;
const bChange = getPriceChange(b).percentage;
return bChange - aChange;
})
.slice(0, 6);

return ( <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2"> <PriceList
     title="আজ দাম বেড়েছে ▲"
     products={rising}
     direction="up"
   />


  <PriceList
    title="আজ দাম কমেছে ▼"
    products={falling}
    direction="down"
  />
</div>


);
}
