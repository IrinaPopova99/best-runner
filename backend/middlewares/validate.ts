import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";

export const validate =
  <T>(schema: SchemaOf<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
      });
      return next();
    } catch (err: any) {
      return res
        .status(500)
        .json({
          type: err.name,
          message: err.message,
          field: err.path.replaceAll("body", "").replace(".", ""),
        });
    }
  };
