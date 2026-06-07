import { ProductModel, ProductData } from "@/models/product.model";

export class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      search
        ? this.model.searchByName(search, { skip, take: limit })
        : this.model.findAll({ skip, take: limit }),
      search
        ? this.model.countByName(search)
        : this.model.count(),
    ]);
    return { data, total, page, limit };
  }

  async findById(id: number) {
    const product = await this.model.findById(id);
    if (!product)
      throw Object.assign(new Error("Product not found"), { statusCode: 404 });
    return product;
  }

  async create(data: ProductData) {
    return this.model.create(data);
  }

  async update(id: number, data: Partial<ProductData>) {
    await this.findById(id);
    return this.model.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.model.delete(id);
  }

  // Nested Loop + Math
  async getProductStatistics() {
    const products = await this.model.findAll();
    const stats: Record<
      string,
      { count: number; totalValue: number; avgPrice: number }
    > = {};

    for (const product of products) {
      const category = product.category;
      if (!stats[category]) {
        stats[category] = { count: 0, totalValue: 0, avgPrice: 0 };
      }
      stats[category].count++;
      stats[category].totalValue += product.price * product.stock;
    }

    for (const key in stats) {
      stats[key].avgPrice = stats[key].totalValue / stats[key].count;
    }

    return stats;
  }

  // Nested If + Math (Discount Logic)
  calculateDiscount(price: number, stock: number, isMember: boolean) {
    let discount = 0;

    if (price > 100000) {
      if (stock > 50) {
        discount = 20;
      } else if (stock > 20) {
        discount = 15;
      } else {
        discount = 10;
      }
    } else if (price > 50000) {
      if (stock > 50) {
        discount = 10;
      } else {
        discount = 5;
      }
    }

    if (isMember) {
      discount += 5;
    }

    const discountedPrice = price - (price * discount) / 100;
    return { originalPrice: price, discount, discountedPrice };
  }
}
