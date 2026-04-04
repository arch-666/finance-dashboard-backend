import { verifier } from "../utils/jwt.js";
import prisma from "../lib/prisma.js";
export const authMiddleware = (role) => async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const tokenData = verifier(token);
        const user = await prisma.user.findUnique({
            where: { id: tokenData.user_id },
        });
        if (!user) {
            return res.status(401).json({ message: "user doesn't exist" });
        }
        if (!role.includes(user.role)) {
            res.status(401).json({ message: "you are not authorized for this" });
        }
        req.validatedUserData = {
            userid: user?.id,
            email: user?.email,
            name: user?.name,
        };
        req.id = user.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: err });
    }
};
