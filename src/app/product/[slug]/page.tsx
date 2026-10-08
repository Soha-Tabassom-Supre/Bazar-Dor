import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function ProductDetails({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-6xl">{product.image}</div>

          <h1 className="mt-4 text-3xl font-extrabold">{product.nameBn}</h1>

          <p className="mt-2 text-gray-600">
            প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
          </p>

          <p className="mt-6 text-4xl font-extrabold text-emerald-700">
            ৳{product.today}
          </p>

          {product.change?.dir === "up" ? (
            <p className="mt-2 font-semibold text-red-600">
              ↑ গত দিনের তুলনায় {product.change.pct}% দাম বেড়েছে
            </p>
          ) : product.change?.dir === "down" ? (
            <p className="mt-2 font-semibold text-green-600">
              ↓ গত দিনের তুলনায় {product.change.pct}% দাম কমেছে
            </p>
          ) : null}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">দামের ইতিহাস</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="text-sm text-gray-500">আজকের দাম</p>
              <p className="mt-2 text-xl font-bold">৳{product.today}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="text-sm text-gray-500">গতকালের দাম</p>
              <p className="mt-2 text-xl font-bold">৳{product.yesterday}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="text-sm text-gray-500">গত সপ্তাহের দাম</p>
              <p className="mt-2 text-xl font-bold">৳{product.lastWeek}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="text-sm text-gray-500">গত মাসের দাম</p>
              <p className="mt-2 text-xl font-bold">৳{product.lastMonth}</p>
            </div>
          </div>
        </section>

   
        <section className="mt-8">
          <h2 className="text-2xl font-bold">বাজারভিত্তিক দাম</h2>

          <p className="mt-2 text-sm text-gray-600">
            বিভিন্ন বাজারে পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম
          </p>

          <div className="mt-4 space-y-3">
            {product.markets && product.markets.length > 0 ? (
              product.markets.map((market, index) => (
                <div
                  key={`${market.market}-${index}`}
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {market.market}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {market.division} বিভাগ
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">দামের পরিসর</p>

                      <p className="mt-1 font-bold text-emerald-700">
                        ৳{market.min} – ৳{market.max}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-gray-200 p-5 text-gray-600">
                বাজারভিত্তিক দাম পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white p-8 text-gray-600">
          পণ্যের তথ্য লোড হচ্ছে...
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}
