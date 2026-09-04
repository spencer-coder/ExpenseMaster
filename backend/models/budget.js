const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // Calendar month, as "YYYY-MM".
    month: {
      type: String,
      required: [true, "Budget month is required"],
      match: [/^\d{4}-(0[1-9]|1[0-2])$/, "Month must be in YYYY-MM format"],
    },
    amount: {
      type: Number,
      required: [true, "Budget amount is required"],
      min: [0, "Budget cannot be negative"],
    },
    // null = the overall budget; reserved so per-category budgets need no migration later.
    category: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

budgetSchema.index({ user: 1, month: 1, category: 1 }, { unique: true });

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
