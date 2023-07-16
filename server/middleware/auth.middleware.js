import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) =>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token = req.headers.authorization.split(" ")[1];
            const secretKey = process.env.JWT_SECRET_KEY || "SecretKey@1234";
            const validatedData = jwt.verify(token, secretKey);
            const user = await User.findOne({email: validatedData.email});
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}