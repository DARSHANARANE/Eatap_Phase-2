import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mess",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
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

// One menu per mess per day
menuSchema.index({ messId: 1, date: 1 }, { unique: true });

export default mongoose.model("Menu", menuSchema);
