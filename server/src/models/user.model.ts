import bcrypt from "bcrypt";
import { model, Schema, type HydratedDocument, type Model } from "mongoose";
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

const userSchema = new Schema<UserDocument, UserModelType, UserModelMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "sales"],
      default: "sales",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre("save", async function preSave() {
  if (!this.isModified("password")) {
    return;
  }

  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const UserModel = model<UserDocument, UserModelType>("User", userSchema);

export { UserModel };
export type { UserDocument, UserHydratedDocument, UserModelMethods };
