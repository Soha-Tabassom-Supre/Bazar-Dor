
import { getCategories, getProducts } from "@/lib/api";
import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import Link from "next/link";
import PriceMovers from "@/components/PriceMovers";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-white px-4 py-6 text-gray-900 sm:px-6 lg:py-8">
      <div className="mx-auto max-w-6xl">
       
        <Hero />

       
        <section className="mt-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">বাজার দর</h1>
          <p className="mt-2 text-gray-600">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </section>

        
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900">ক্যাটাগরি</h2>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
              >
                <div className="text-3xl sm:text-4xl">{category.icon}</div>

                <h3 className="mt-3 font-semibold text-gray-900">
                  {category.nameBn}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{category.slug}</p>
              </Link>
            ))}
          </div>
        </section>

        <PriceMovers products={products} />
        <AllProducts products={products} />
      </div>
    </main>
  );
}
