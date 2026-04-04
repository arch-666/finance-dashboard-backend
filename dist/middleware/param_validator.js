import { z } from "zod";
export const validaterParamsMiddleware = (req, res, next) => {
    console.log(req.params);
    const schema = z.string().uuid();
    const input = schema.safeParse(req.params.id);
    console.log(input);
    if (!input.success) {
        res.status(401).json({ "wrong input schema": input });
    }
    console.log("validate params middleware", input);
    req.id = input.data;
    next();
};
