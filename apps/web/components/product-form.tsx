"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/api";

export function ProductForm({
  product,
}: {
  product?: Product;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name") as string,
      description: form.get("description") as string || undefined,
      price: Number(form.get("price")),
      stock: Number(form.get("stock")),
      category: form.get("category") as string || "general",
    };

    const url = product
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/products/${product.id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/products`;

    const res = await fetch(url, {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.success) {
      router.push(product ? `/products/${product.id}` : "/products");
      router.refresh();
    } else {
      setError(data.errors?.join(", ") || data.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-medium">Name *</label>
        <input
          id="name"
          name="name"
          required
          maxLength={100}
          defaultValue={product?.name}
          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          maxLength={500}
          rows={3}
          defaultValue={product?.description}
          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="text-sm font-medium">Price *</label>
          <input
            id="price"
            name="price"
            type="number"
            required
            min={0}
            step="any"
            defaultValue={product?.price}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
          />
        </div>
        <div>
          <label htmlFor="stock" className="text-sm font-medium">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min={0}
            defaultValue={product?.stock ?? 0}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <input
          id="category"
          name="category"
          maxLength={50}
          defaultValue={product?.category || "general"}
          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Saving..." : product ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-md text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
