const { Router } = require("express");
const { getBudget, setBudget } = require("../controllers/budgetController");
const protect = require("../middleware/authMiddleware");

const router = Router();

router.get("/", protect, getBudget);
router.put("/", protect, setBudget);

module.exports = { BudgetRouter: router };
