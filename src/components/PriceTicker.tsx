import { getProducts } from "@/lib/api";

export default async function PriceTicker() {
const products = await getProducts();

return ( <div className="w-full overflow-hidden border-y border-emerald-200 bg-emerald-50 py-3"> <div className="flex w-max animate-marquee whitespace-nowrap">
{[...products, ...products].map((product, index) => (
<div
key={`${product.id}-${index}`}
className="mr-8 flex shrink-0 items-center gap-2 text-sm font-medium text-gray-900 sm:mr-10 sm:text-base"
> <span className="font-bold text-gray-900">
{product.nameBn} </span>

        <span className="font-extrabold text-emerald-800">
          ৳{product.today}/{product.unit === "kg" ? "কেজি" : product.unit}
        </span>

        {product.change?.dir === "up" && (
          <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-800 sm:text-sm">
            ↑ {product.change.pct}%
          </span>
        )}

        {product.change?.dir === "down" && (
          <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-bold text-green-800 sm:text-sm">
            ↓ {product.change.pct}%
          </span>
        )}

        <span className="ml-2 text-emerald-500">●</span>
      </div>
    ))}
  </div>
</div>


);
}
