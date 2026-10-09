import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export const instant = false;

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

  const products = allProducts.filter((product) => product.category === slug);

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-extrabold">
            {category.icon} {category.nameBn}
          </h1>

          <p className="mt-2 text-gray-600">
            এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর
          </p>
        </div>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-[60vh] bg-white p-8 text-gray-600">
          ক্যাটাগরির পণ্য লোড হচ্ছে...
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
