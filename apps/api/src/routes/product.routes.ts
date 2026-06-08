import { Router } from "express";
import { ProductController } from "@/controllers/product.controller";
import { validate } from "@/middleware/validate.middleware";
import { createProductSchema, updateProductSchema } from "@hashmicro/shared-utils";

const router = Router();
const controller = new ProductController();

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /api/products/stats:
 *   get:
 *     tags: [Products]
 *     summary: Get product statistics by category
 *     description: Uses nested loop to aggregate stats per category
 *     responses:
 *       200:
 *         description: Product statistics
 */
router.get("/stats", controller.getStats);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 */
router.post("/", validate(createProductSchema), controller.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProduct'
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put("/:id", validate(updateProductSchema), controller.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/:id", controller.delete);

/**
 * @swagger
 * /api/products/discount:
 *   post:
 *     tags: [Products]
 *     summary: Calculate discount (Nested If + Math)
 *     description: Calculates discount based on price, stock, and membership using nested if logic
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountRequest'
 *     responses:
 *       200:
 *         description: Discount calculated
 */
router.post("/discount", controller.getDiscount);

export default router;
