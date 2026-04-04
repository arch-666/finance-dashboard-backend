export const validatorMiddleware = (schema) => (req, res, next) => {
    const input = schema.safeParse(req.body);
    if (!input.success) {
        res.status(401).json({ "Wrong input schema": input });
    }
    req.validatedData = input.data;
    next();
};
