import Link from "next/link";
import type { Product } from "@/lib/api";

interface AllProductsProps {
products: Product[];
}

export default function AllProducts({ products }: AllProductsProps) {
return ( <section className="mt-10"> <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>

  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {products.map((product) => (
      <Link
        key={product.id}
        href={`/product/${product.slug}`}
        className="block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="text-4xl">{product.image}</div>

        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-2xl font-extrabold text-emerald-700">
            ৳{product.today}
          </p>

          {product.change?.dir === "up" ? (
            <span className="text-sm font-semibold text-red-600">
              ↑ {product.change.pct}%
            </span>
          ) : product.change?.dir === "down" ? (
            <span className="text-sm font-semibold text-green-600">
              ↓ {product.change.pct}%
            </span>
          ) : null}
        </div>
      </Link>
    ))}
  </div>
</section>

);
}
