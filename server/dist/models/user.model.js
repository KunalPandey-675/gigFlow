import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
const userSchema = new Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.pre("save", async function preSave() {
    if (!this.isModified("password")) {
        return;
    }
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
});
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
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
const UserModel = model("User", userSchema);
export { UserModel };
//# sourceMappingURL=user.model.js.map