const { Router } = require("express");
const {
  createExpense,
  deleteExpense,
  getAllExpenses,
} = require("../controllers/expenseController");
const protect = require("../middleware/authMiddleware");

const router = Router();

router.post("/", protect, createExpense);

router.get("/", protect, getAllExpenses);

router.delete("/:id", protect, deleteExpense);

module.exports = { ExpenseRouter: router };
