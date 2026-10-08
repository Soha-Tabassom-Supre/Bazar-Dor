const API_URL = "https://api.abcz.workers.dev/api/bazardor";
export interface Product {
  id: number;
  nameBn: string;
  slug: string;
  category: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change?: {
    dir: string;
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
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
