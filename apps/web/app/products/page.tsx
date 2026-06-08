import Link from "next/link";
import { Button } from "@hashmicro/ui/components/button";
import { Badge } from "@hashmicro/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@hashmicro/ui/components/table";
import { Input } from "@hashmicro/ui/components/input";
import { api } from "@/lib/api";
import { DeleteButton } from "@/components/delete-button";
import { Pagination } from "@/components/pagination";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const limit = 10;

  const res = await api.products.list(page, limit, search);
  const products = res.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/products/new">Add Product</Link>
        </Button>
      </div>

      <form className="mb-4 flex gap-2">
        <Input
          name="search"
          placeholder="Search products..."
          defaultValue={search}
          className="max-w-sm"
        />
        <Button type="submit" variant="outline">Search</Button>
      </form>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Link href={`/products/${product.id}`} className="hover:underline font-medium">
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell>Rp {product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/products/${product.id}/edit`}>Edit</Link>
                      </Button>
                      <DeleteButton id={product.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination page={page} total={res.total || 0} limit={limit} />
    </div>
  );
}
