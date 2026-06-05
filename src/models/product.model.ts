import { BaseModel } from "./base.model";

export interface ProductData {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
}

export class ProductModel extends BaseModel<ProductData> {
  constructor() {
    super("product");
  }

  async create(data: ProductData) {
    return this.prisma.product.create({ data });
  }

  async update(id: number, data: Partial<ProductData>) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async findByCategory(category: string) {
    return this.prisma.product.findMany({
      where: { category },
    });
  }

  async findByPriceRange(min: number, max: number) {
    return this.prisma.product.findMany({
      where: {
        price: { gte: min, lte: max },
      },
    });
  }

  async searchByName(keyword: string) {
    return this.prisma.product.findMany({
      where: {
        name: { contains: keyword },
      },
    });
  }
}
