const { Router } = require("express");
const {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} = require("../controllers/expenseController");
const protect = require("../middleware/authMiddleware");

const router = Router();

router.post("/", protect, createExpense);

router.get("/", protect, getAllExpenses);

router.put("/:id", protect, updateExpense);

router.delete("/:id", protect, deleteExpense);

module.exports = { ExpenseRouter: router };
