import { AppError } from "../utils/app-error.js";
import { UserModel } from "../models/user.model.js";
import { generateAccessToken } from "../services/token.service.js";
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await UserModel.findOne({ email }).lean();
        if (existingUser) {
            throw new AppError("Email is already registered", 409);
        }
        const user = await UserModel.create({
            name,
            email,
            password,
            role: role ?? "sales",
        });
        const safeUser = user.toSafeObject();
        const accessToken = generateAccessToken({
            sub: safeUser.id,
            email: safeUser.email,
            role: safeUser.role,
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: safeUser,
                accessToken,
            },
        });
    }
    catch (error) {
        return next(error);
    }
};
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }
        const safeUser = user.toSafeObject();
        const accessToken = generateAccessToken({
            sub: safeUser.id,
            email: safeUser.email,
            role: safeUser.role,
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: safeUser,
                accessToken,
            },
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user?.sub) {
            throw new AppError("Unauthorized", 401);
        }
        const user = await UserModel.findById(req.user.sub);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return res.status(200).json({
            success: true,
            message: "Current user fetched successfully",
            data: {
                user: user.toSafeObject(),
            },
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getAdminOnlyData = (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Admin access granted",
        data: {
            scope: "admin",
        },
    });
};
//# sourceMappingURL=auth.controller.js.map