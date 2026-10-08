import { getCategories, getProducts } from "@/lib/api";
import AllProducts from "@/components/AllProducts";
import Link from "next/link";

export default async function Home() {
const [products, categories] = await Promise.all([
getProducts(),
getCategories(),
]);

return (
  <main className="min-h-screen bg-white p-6 text-gray-900">

    <div className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold">বাজার দর</h1>
      <p className="mt-2 text-gray-600">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
      <section className="mt-8">
        <h2 className="text-2xl font-bold">ক্যাটাগরি</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-4xl">
                {"icon" in category ? category.icon : "🛒"}
              </div>
              
              <h3 className="mt-3 text-lg font-semibold">{category.nameBn}</h3>
              <p className="text-sm text-gray-500">{category.slug}</p>

            </Link>
          ))}
        </div>
      </section>
      <AllProducts products={products} />
    </div>
  </main>
);
}
