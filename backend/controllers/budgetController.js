const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget");

const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

// Returns null when no budget is set: a missing budget is a normal state, not a 404.
const getBudget = asyncHandler(async (req, res) => {
  const { month } = req.query;

  if (!month || !MONTH_PATTERN.test(month)) {
    res.status(400);
    throw new Error("A month in YYYY-MM format is required");
  }

  const budget = await Budget.findOne({
    user: req.user.id,
    month,
    category: null,
  });

  res.status(200).json(budget);
});

const setBudget = asyncHandler(async (req, res) => {
  const { month, amount } = req.body;

  if (!month || !MONTH_PATTERN.test(month)) {
    res.status(400);
    throw new Error("A month in YYYY-MM format is required");
  }

  if (amount === undefined || amount === null) {
    res.status(400);
    throw new Error("Missing amount");
  }

  if (typeof amount !== "number" || Number.isNaN(amount)) {
    res.status(400);
    throw new Error("Amount must be a number");
  }

  if (amount < 0) {
    res.status(400);
    throw new Error("Budget cannot be negative");
  }

  const budget = await Budget.findOneAndUpdate(
    { user: req.user.id, month, category: null },
    { amount },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );

  res.status(200).json(budget);
});

module.exports = { getBudget, setBudget };
