"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@hashmicro/ui/components/card";
import { api } from "@/lib/api";

export default function DiscountPage() {
  const [result, setResult] = useState<{
    originalPrice: number;
    discount: number;
    discountedPrice: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const form = new FormData(e.currentTarget);
    const price = Number(form.get("price"));
    const stock = Number(form.get("stock"));
    const isMember = form.get("isMember") === "on";

    const res = await api.products.discount(price, stock, isMember);

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.errors?.join(", ") || res.message || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Discount Calculator</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Price *</label>
                <input
                  name="price"
                  type="number"
                  required
                  min={0}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  placeholder="e.g. 12500000"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Stock *</label>
                <input
                  name="stock"
                  type="number"
                  required
                  min={0}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  placeholder="e.g. 60"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  name="isMember"
                  type="checkbox"
                  id="isMember"
                  className="rounded"
                />
                <label htmlFor="isMember" className="text-sm font-medium">
                  Member (+5% discount)
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50"
              >
                {loading ? "Calculating..." : "Calculate"}
              </button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Price</span>
                  <span className="font-medium">Rp {result.originalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600">{result.discount}%</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-medium">Final Price</span>
                  <span className="text-lg font-bold">Rp {result.discountedPrice.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
