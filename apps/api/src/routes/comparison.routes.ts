import { Router } from "express";
import { ComparisonController } from "@/controllers/comparison.controller";
import { validate } from "@/middleware/validate.middleware";
import { comparisonSchema } from "@hashmicro/shared-utils";

const router = Router();
const controller = new ComparisonController();

/**
 * @swagger
 * /api/comparison:
 *   post:
 *     tags: [Comparison]
 *     summary: Compare two strings (sensitive / non-sensitive)
 *     description: |
 *       Calculates what percentage of characters from input1 appear in input2.
 *       - **sensitive**: exact case match (D ≠ d)
 *       - **nonsensitive**: case-insensitive match (D = d)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComparisonRequest'
 *           examples:
 *             sensitive:
 *               summary: Sensitive case
 *               value:
 *                 input1: "ABBCD"
 *                 input2: "Gallant Duck"
 *                 type: "sensitive"
 *             nonsensitive:
 *               summary: Non-sensitive case
 *               value:
 *                 input1: "ABBCD"
 *                 input2: "Gallant Duck"
 *                 type: "nonsensitive"
 *     responses:
 *       200:
 *         description: Comparison result with percentage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   $ref: '#/components/schemas/ComparisonResult'
 *       400:
 *         description: Validation error
 */
router.post("/", validate(comparisonSchema), controller.compare);

export default router;
