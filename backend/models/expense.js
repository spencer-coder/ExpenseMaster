const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Expense text is required"],
    },
    customDate: {
      type: String,
    },
    // Keep this list in sync with frontend/src/constants/categories.js
    category: {
      type: String,
      enum: [
        "food",
        "transport",
        "housing",
        "utilities",
        "health",
        "entertainment",
        "shopping",
        "other",
      ],
      default: "other",
    },
    amount: {
      type: Number,
      required: [true, "Expense amount is required"],
      default: 0,
    },
  },
  { timestamps: true },
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
