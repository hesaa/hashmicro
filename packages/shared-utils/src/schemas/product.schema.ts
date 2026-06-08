import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().min(0, "Stock cannot be negative").default(0),
  category: z.string().max(50).default("general"),
});

export const updateProductSchema = createProductSchema.partial();

export const comparisonSchema = z.object({
  input1: z.string().min(1, "Input 1 is required"),
  input2: z.string().min(1, "Input 2 is required"),
  type: z.enum(["sensitive", "nonsensitive"], {
    message: "Type must be 'sensitive' or 'nonsensitive'",
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ComparisonInput = z.infer<typeof comparisonSchema>;
