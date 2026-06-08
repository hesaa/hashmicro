import { Card, CardContent, CardHeader, CardTitle } from "@hashmicro/ui/components/card";
import { Badge } from "@hashmicro/ui/components/badge";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const res = await api.products.stats();
  const stats = res.data || {};

  const categories = Object.entries(stats);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Product Statistics</h1>

      {categories.length === 0 ? (
        <p className="text-muted-foreground">No product data available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(([category, data]) => (
            <Card key={category}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <Badge variant="secondary">{data.count} items</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-medium">Rp {data.totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Price</span>
                    <span className="font-medium">Rp {data.avgPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
