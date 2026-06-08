"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@hashmicro/ui/components/card";
import { Badge } from "@hashmicro/ui/components/badge";
import { api } from "@/lib/api";
import type { ComparisonResult } from "@/lib/api";

export default function ComparisonPage() {
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const form = new FormData(e.currentTarget);
    const input1 = form.get("input1") as string;
    const input2 = form.get("input2") as string;
    const type = form.get("type") as "sensitive" | "nonsensitive";

    const res = await api.comparison.compare(input1, input2, type);

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.errors?.join(", ") || res.message || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">String Comparison</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compare Strings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Input 1 *</label>
                <input
                  name="input1"
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  placeholder="e.g. ABBCD"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Input 2 *</label>
                <input
                  name="input2"
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                  placeholder="e.g. Gallant Duck"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Type *</label>
                <select
                  name="type"
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-sm"
                >
                  <option value="sensitive">Sensitive (case-sensitive)</option>
                  <option value="nonsensitive">Non-sensitive (case-insensitive)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50"
              >
                {loading ? "Comparing..." : "Compare"}
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
                  <span className="text-muted-foreground">Input 1</span>
                  <span className="font-mono font-medium">{result.input1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Input 2</span>
                  <span className="font-mono font-medium">{result.input2}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant="secondary">{result.type}</Badge>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground">Total Chars</span>
                  <span>{result.totalChars}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Matched Chars</span>
                  <span>{result.matchedChars}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-medium">Match Percentage</span>
                  <span className="text-2xl font-bold">{result.percentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
