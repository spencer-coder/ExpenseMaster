const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // Calendar month this budget applies to, as "YYYY-MM".
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
    // null means an overall budget for the month. Reserved so per-category
    // budgets can be added later without a migration.
    category: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

// One budget per user, per month, per category (null category = the overall one).
budgetSchema.index({ user: 1, month: 1, category: 1 }, { unique: true });

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
