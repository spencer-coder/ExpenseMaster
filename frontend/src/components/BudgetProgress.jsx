import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/currencyFormatter";
import { currentMonth, expenseMonth } from "../utils/month";

// Shows this month's spending against the budget. Expects the *unfiltered*
// expense list -- the Home filters narrow the visible transactions, not this.
function BudgetProgress({ expenses, budget }) {
  const month = currentMonth();

  const spent = expenses
    .filter((expense) => expense.type === "expense" && expenseMonth(expense) === month)
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  if (!budget || !budget.amount) {
    return (
      <div className="w-96 text-center text-sm text-gray-400">
        Spent {formatCurrency(spent)} this month.{" "}
        <Link to="/user" className="link">
          Set a budget
        </Link>
      </div>
    );
  }

  const ratio = spent / budget.amount;
  const percent = Math.round(ratio * 100);

  // Under 80% normal, 80-100% warning, over budget error.
  const tone = ratio >= 1 ? "progress-error" : ratio >= 0.8 ? "progress-warning" : "progress-primary";
  const remaining = budget.amount - spent;

  return (
    <div className="w-96 p-4 bg-base-200 rounded-lg">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-semibold">Monthly Budget</p>
        <p className="text-sm text-gray-400">{percent}%</p>
      </div>

      <progress
        className={`progress ${tone} w-full`}
        // The bar caps at 100% while the text below reports the real overage.
        value={Math.min(percent, 100)}
        max="100"
      ></progress>

      <div className="flex items-baseline justify-between mt-2 text-sm">
        <span>
          {formatCurrency(spent)} of {formatCurrency(budget.amount)}
        </span>
        <span className={ratio >= 1 ? "text-error font-semibold" : ""}>
          {remaining >= 0
            ? `${formatCurrency(remaining)} left`
            : `${formatCurrency(Math.abs(remaining))} over`}
        </span>
      </div>
    </div>
  );
}

export default BudgetProgress;
