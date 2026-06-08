const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

export interface ComparisonResult {
  input1: string;
  input2: string;
  type: string;
  totalChars: number;
  matchedChars: number;
  percentage: number;
}

export interface DiscountResult {
  originalPrice: number;
  discount: number;
  discountedPrice: number;
}

export interface ProductStats {
  [category: string]: {
    count: number;
    totalValue: number;
    avgPrice: number;
  };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return res.json();
}

export const api = {
  products: {
    list: (page = 1, limit = 10, search = "") =>
      request<PaginatedResponse<Product>>(
        `/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      ),
    get: (id: number) =>
      request<ApiResponse<Product>>(`/api/products/${id}`),
    create: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) =>
      request<ApiResponse<Product>>("/api/products", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>) =>
      request<ApiResponse<Product>>(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: number) =>
      request<ApiResponse<null>>(`/api/products/${id}`, {
        method: "DELETE",
      }),
    stats: () =>
      request<ApiResponse<ProductStats>>("/api/products/stats"),
    discount: (price: number, stock: number, isMember: boolean) =>
      request<ApiResponse<DiscountResult>>("/api/products/discount", {
        method: "POST",
        body: JSON.stringify({ price, stock, isMember }),
      }),
  },
  comparison: {
    compare: (input1: string, input2: string, type: "sensitive" | "nonsensitive") =>
      request<ApiResponse<ComparisonResult>>("/api/comparison", {
        method: "POST",
        body: JSON.stringify({ input1, input2, type }),
      }),
  },
};
