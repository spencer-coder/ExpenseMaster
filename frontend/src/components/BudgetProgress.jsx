import { Link } from "react-router-dom";
import { FaCircleCheck, FaTriangleExclamation, FaCircleExclamation, FaWallet } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import { currentMonth, expenseMonth } from "../utils/month";

// The hero card: this month's spending against the budget.
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
      <div className="flex flex-col justify-between p-5 rounded-xl bg-base-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-base-content/60">Spent this month</p>
            <p className="mt-1 text-4xl font-semibold">{formatCurrency(spent)}</p>
          </div>
          <FaWallet className="text-2xl text-base-content/30" />
        </div>
        <p className="mt-4 text-sm text-base-content/60">
          <Link to="/user" className="link link-primary">
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

  // Status is never carried by colour alone: each state ships an icon and a
  // text label. Warning in particular is sub-3:1 on the light surface by design.
  // Class names are written out in full rather than composed at runtime --
  // Tailwind's JIT scans the source for literal class strings, so a name built
  // by concatenation is never generated.
  const status = overBudget
    ? {
        label: "Over budget",
        Icon: FaCircleExclamation,
        text: "text-error",
        fill: "bg-error",
        track: "bg-error/20",
      }
    : ratio >= 0.8
      ? {
          label: "Close to limit",
          Icon: FaTriangleExclamation,
          text: "text-warning",
          fill: "bg-warning",
          track: "bg-warning/20",
        }
      : {
          label: "On track",
          Icon: FaCircleCheck,
          text: "text-success",
          fill: "bg-success",
          track: "bg-success/20",
        };

  return (
    <div className="flex flex-col justify-between p-5 rounded-xl bg-base-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-base-content/60">
            {overBudget ? "Over budget by" : "Left to spend"}
          </p>
          {/* The one hero figure on this page. Proportional figures, same sans. */}
          <p className="mt-1 text-4xl font-semibold">{formatCurrency(Math.abs(remaining))}</p>
        </div>
        <span className={`flex items-center gap-1.5 text-sm ${status.text}`}>
          <status.Icon aria-hidden="true" />
          {status.label}
        </span>
      </div>

      {/* Meter: the unfilled track is a lighter step of the same ramp, so the
          state reads across the whole bar rather than only the filled part. */}
      <div className="mt-4">
        <div className={`w-full h-2.5 rounded-full ${status.track}`}>
          <div
            className={`h-2.5 rounded-full ${status.fill}`}
            // Capped at 100% -- the figures above and below report the true overage.
            style={{ width: `${Math.min(Math.max(percent, 2), 100)}%` }}
          />
        </div>

        <div className="flex items-baseline justify-between mt-2 text-sm text-base-content/60">
          <span>
            {formatCurrency(spent)} of {formatCurrency(budget.amount)}
          </span>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
}

export default BudgetProgress;
