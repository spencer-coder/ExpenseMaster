import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import { currentMonth, expenseMonth } from "../utils/month";

// The main card on Home: this month's spending against the budget.
// Expects the *unfiltered* expense list -- the Home filters narrow the visible
// transactions, not what counts against the budget.
function BudgetProgress({ expenses, budget }) {
  const month = currentMonth();

  const spent = expenses
    .filter((expense) => expenseMonth(expense) === month)
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  // No budget set yet: still show the month's spending, and offer a way to set one.
  if (!budget || !budget.amount) {
    return (
      <div className="w-96 p-4 rounded-xl shadow-lg bg-base-200">
        <div className="flex items-center justify-between gap-8">
          <div>
            <p className="text-sm">Spent this month</p>
            <p className="text-2xl font-semibold">{formatCurrency(spent)}</p>
          </div>
          <FaWallet className="text-3xl opacity-60" />
        </div>
        <p className="mt-3 text-sm text-gray-400">
          <Link to="/user" className="link">
            Set a budget
          </Link>{" "}
          to track what is left.
        </p>
      </div>
    );
  }

  const remaining = budget.amount - spent;
  const overBudget = remaining < 0;
  const ratio = spent / budget.amount;
  const percent = Math.round(ratio * 100);

  // Under 80% normal, 80-100% warning, over budget error.
  const tone = ratio >= 1 ? "progress-error" : ratio >= 0.8 ? "progress-warning" : "progress-primary";

  return (
    <div className="w-96 p-4 rounded-xl shadow-lg bg-base-200">
      <div className="flex items-center justify-between gap-8">
        <div>
          <p className="text-sm">{overBudget ? "Over budget" : "Left to spend"}</p>
          <p className={`text-3xl font-semibold ${overBudget ? "text-error" : ""}`}>
            {formatCurrency(Math.abs(remaining))}
          </p>
        </div>
        <FaWallet className="text-3xl opacity-60" />
      </div>

      <progress
        className={`progress ${tone} w-full mt-3`}
        // The bar caps at 100% while the figures above and below report the real overage.
        value={Math.min(percent, 100)}
        max="100"
      ></progress>

      <div className="flex items-baseline justify-between text-sm text-gray-400">
        <span>
          {formatCurrency(spent)} of {formatCurrency(budget.amount)}
        </span>
        <span>{percent}%</span>
      </div>
    </div>
  );
}

export default BudgetProgress;
