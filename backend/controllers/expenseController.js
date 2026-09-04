const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense");
const User = require("../models/user");

const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({
    user: req.user.id,
  });
  res.status(200).json(expenses);
});

const createExpense = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Missing text");
  }
  // Not `!req.body.amount`, so an amount of exactly 0 is accepted rather than reported missing.
  if (req.body.amount === undefined || req.body.amount === null) {
    res.status(400);
    throw new Error("Missing amount");
  }

  if (typeof req.body.amount !== "number" || Number.isNaN(req.body.amount)) {
    res.status(400);
    throw new Error("Amount must be a number");
  }

  if (req.body.amount < 0) {
    res.status(400);
    throw new Error("Amount cannot be negative");
  }

  const expense = await Expense.create({
    text: req.body.text,
    amount: req.body.amount,
    category: req.body.category,
    user: req.user.id,
    customDate: req.body.customDate,
  });

  res.status(200).json(expense);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    res.status(400);
    throw new Error("Expense not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (expense.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  await Expense.findByIdAndDelete(req.params.id);
  res.status(200).json(expense);
});

module.exports = {
  getAllExpenses,
  createExpense,
  deleteExpense,
};
