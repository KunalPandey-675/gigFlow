export const validateQuery = (schema) => {
    return (req, _res, next) => {
        const parsed = schema.parse(req.query);
        // Express 5 uses a getter for req.query; mutate instead of reassigning.
        Object.assign(req.query, parsed);
        next();
    };
};
//# sourceMappingURL=validateQuery.middleware.js.map