import { Request, Response, NextFunction } from "express";
import { ProductService } from "@/services/product.service";

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const search = String(req.query.search || "");
      const result = await this.service.findAll(page, limit, search);
      res.json({ success: true, message: "Products retrieved", ...result });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.findById(parseInt(String(req.params.id)));
      res.json({
        success: true,
        message: "Product retrieved",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        message: "Product created",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.update(
        parseInt(String(req.params.id)),
        req.body
      );
      res.json({
        success: true,
        message: "Product updated",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(parseInt(String(req.params.id)));
      res.json({ success: true, message: "Product deleted" });
    } catch (err) {
      next(err);
    }
  };

  getStats = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.service.getProductStatistics();
      res.json({
        success: true,
        message: "Statistics retrieved",
        data: stats,
      });
    } catch (err) {
      next(err);
    }
  };

  getDiscount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { price, stock, isMember } = req.body;
      const result = this.service.calculateDiscount(price, stock, isMember);
      res.json({
        success: true,
        message: "Discount calculated",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
