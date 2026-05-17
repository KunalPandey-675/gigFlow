import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validate = <T>(schema: ZodType<T>): RequestHandler => {
  return (req, _res, next) => {
    const parsedBody = schema.parse(req.body);
    req.body = parsedBody;

    next();
  };
};
