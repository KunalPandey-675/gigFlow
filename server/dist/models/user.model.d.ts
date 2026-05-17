import { type HydratedDocument, type Model } from "mongoose";
import type { SafeUser, UserRole } from "../types/auth.types.js";
interface UserModelMethods {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    toSafeObject: () => SafeUser;
}
interface UserDocument {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
type UserHydratedDocument = HydratedDocument<UserDocument, UserModelMethods>;
type UserModelType = Model<UserDocument, object, UserModelMethods>;
declare const UserModel: UserModelType;
export { UserModel };
export type { UserDocument, UserHydratedDocument, UserModelMethods };
