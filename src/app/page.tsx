import { getCategories, getProducts } from "@/lib/api";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">বাজার দর</h1>

        <p className="mt-2 text-base-content/70">
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Categories</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl bg-base-100 p-5 shadow"
              >
                <div className="text-4xl">{category.icon}</div>

                <h3 className="mt-3 text-lg font-semibold">
                  {category.nameBn}
                </h3>

                <p className="text-sm text-base-content/60">{category.slug}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">সব পণ্য</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-base-100 p-5 shadow"
              >
                <div className="text-4xl">{product.icon}</div>

                <h3 className="mt-3 text-lg font-semibold">{product.nameBn}</h3>

                <p className="mt-1 text-sm text-base-content/60">
                  {product.unit}
                </p>

                <p className="mt-3 text-xl font-bold">{product.price} টাকা</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
