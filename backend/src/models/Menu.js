import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    lunch: {
      type: [String],
      default: [],
    },
    dinner: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate menu per mess per date
menuSchema.index({ messId: 1, date: 1 }, { unique: true });

export default mongoose.model("Menu", menuSchema);