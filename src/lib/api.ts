const API_URL = "https://api.abcz.workers.dev/api/bazardor";

export interface Product {
  id: string | number;
  slug: string;
  nameBn: string;
  name?: string;
  category: string;
  categoryName?: string;
  icon: string;
  unit: string;
  price: number;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  change?: number;
  description?: string;
  subtitle?: string;
  [key: string]: unknown;
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getCategory(slug: string): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${slug}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}
