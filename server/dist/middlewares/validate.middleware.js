export const validate = (schema) => {
    return (req, _res, next) => {
        const parsedBody = schema.parse(req.body);
        req.body = parsedBody;
        next();
    };
};
//# sourceMappingURL=validate.middleware.js.map