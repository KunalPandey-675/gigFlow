import { model, Schema } from "mongoose";
const leadSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "lost"],
        default: "new",
        required: true,
        index: true,
    },
    source: {
        type: String,
        enum: ["website", "instagram", "referral"],
        required: true,
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Text index to support search on name and email
leadSchema.index({ name: "text", email: "text" });
const LeadModel = model("Lead", leadSchema);
export { LeadModel };
//# sourceMappingURL=lead.model.js.map