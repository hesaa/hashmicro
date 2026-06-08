import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@hashmicro/ui/components/button";
import { Badge } from "@hashmicro/ui/components/badge";
import { Separator } from "@hashmicro/ui/components/separator";
import { api } from "@/lib/api";
import { DeleteButton } from "@/components/delete-button";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await api.products.get(Number(id));

  if (!res.success || !res.data) {
    notFound();
  }

  const product = res.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/products">Back</Link>
          </Button>
          <Button asChild>
            <Link href={`/products/${product.id}/edit`}>Edit</Link>
          </Button>
          <DeleteButton id={product.id} />
        </div>
      </div>

      <div className="border rounded-lg p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">Rp {product.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stock</p>
            <p>{product.stock}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ID</p>
            <p>{product.id}</p>
          </div>
        </div>

        {product.description && (
          <>
            <Separator className="my-4" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p>{product.description}</p>
            </div>
          </>
        )}

        <Separator className="my-4" />
        <div className="text-xs text-muted-foreground">
          Created: {new Date(product.createdAt).toLocaleString()}
          <br />
          Updated: {new Date(product.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
