import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/expenses/expenseSlice";
import { FaTrashCan } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import { categoryLabel } from "../constants/categories";

function ExpenseItem({ expense }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  // Determine which date to use
  const dateToUse = expense.customDate ? new Date(expense.customDate) : new Date(expense.createdAt);
  const isValidDate = !isNaN(dateToUse.getTime());

  return (
    <div className="relative flex flex-col w-full p-4 group rounded-xl bg-base-200">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold truncate">{expense.text}</p>
        <button
          onClick={handleDelete}
          aria-label={`Delete ${expense.text}`}
          // Revealed on hover or focus, so it stays reachable without a pointer.
          className="transition-opacity opacity-0 shrink-0 btn btn-ghost btn-xs text-base-content/50 hover:text-error group-hover:opacity-100 focus:opacity-100"
        >
          <FaTrashCan size={14} />
        </button>
      </div>

      <p className="mt-1 text-xl font-semibold">{formatCurrency(expense.amount)}</p>

      <div className="flex items-center justify-between gap-2 mt-2">
        <span className="badge badge-ghost badge-sm">{categoryLabel(expense.category)}</span>
        <span className="text-sm text-base-content/60">
          {isValidDate
            ? new Intl.DateTimeFormat(navigator.language, {
                day: "numeric",
                month: "short",
              }).format(dateToUse)
            : "Invalid Date"}
        </span>
      </div>
    </div>
  );
}

export default ExpenseItem;
