import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProducts } from "@/lib/api";

interface CategoryPageProps {
params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
const { slug } = await params;

const [category, allProducts] = await Promise.all([
getCategory(slug).catch(() => null),
getProducts(),
]);

if (!category) {
notFound();
}

const products = allProducts
.filter((product) => product.category === slug)
.sort((a, b) => a.today - b.today);

return ( <main className="min-h-screen bg-white px-4 py-8 text-gray-900 sm:px-6"> <div className="mx-auto max-w-6xl"> <Link
       href="/"
       className="text-sm font-semibold text-emerald-700 hover:underline"
     >
← সব পণ্যে ফিরে যান </Link>

    <div className="mt-6">
      <h1 className="text-3xl font-extrabold">
        {"icon" in category ? category.icon : "🛒"} {category.nameBn}
      </h1>
      <p className="mt-2 text-gray-600">
        এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর
      </p>
    </div>

    {products.length === 0 ? (
      <p className="mt-8 rounded-xl border border-gray-200 p-6 text-gray-600">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
      </p>
    ) : (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-4xl">{product.image}</div>

            <h2 className="mt-3 text-lg font-semibold">
              {product.nameBn}
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </p>

            <div className="mt-4 flex items-center justify-between">
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
          </article>
        ))}
      </div>
    )}
  </div>
</main>


);
}

export default function CategoryPage({ params }: CategoryPageProps) {
return (
<Suspense
fallback={ <main className="min-h-screen bg-white p-8 text-gray-600">
ক্যাটাগরির পণ্য লোড হচ্ছে... </main>
}
> <CategoryContent params={params} /> </Suspense>
);
}
