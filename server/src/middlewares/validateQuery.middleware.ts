import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validateQuery = <T>(schema: ZodType<T>): RequestHandler => {
  return (req, _res, next) => {
    const parsed = schema.parse(req.query);
    // Express 5 uses a getter for req.query; mutate instead of reassigning.
    Object.assign(req.query, parsed);
    next();
  };
};
