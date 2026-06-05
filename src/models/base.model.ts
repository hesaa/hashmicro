import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export abstract class BaseModel<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  async findAll(options?: { skip?: number; take?: number }) {
    return (this.prisma as any)[this.modelName].findMany({
      skip: options?.skip || 0,
      take: options?.take || 100,
    });
  }

  async findById(id: number) {
    return (this.prisma as any)[this.modelName].findUnique({
      where: { id },
    });
  }

  async count() {
    return (this.prisma as any)[this.modelName].count();
  }

  async delete(id: number) {
    return (this.prisma as any)[this.modelName].delete({
      where: { id },
    });
  }
}
