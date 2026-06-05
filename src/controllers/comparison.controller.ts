import { Request, Response, NextFunction } from "express";
import { ComparisonService } from "@/services/comparison.service";

export class ComparisonController {
  private service: ComparisonService;

  constructor() {
    this.service = new ComparisonService();
  }

  compare = (req: Request, res: Response, _next: NextFunction) => {
    const { input1, input2, type } = req.body;
    const result = this.service.compare(input1, input2, type);
    res.json({
      success: true,
      message: "Comparison completed",
      data: result,
    });
  };
}
