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
    <div className="bg-base-300 p-4 rounded-xl  mb-2 w-[400px] md:w-[300px] lg:w-[200px] flex flex-col">
      <p className="text-lg font-semibold">{expense.text}</p>
      <p className="text-base">{formatCurrency(expense.amount)}</p>
      <p className="text-sm text-gray-400">
        {isValidDate
          ? new Intl.DateTimeFormat(navigator.language, {
              day: "numeric",
              month: "short",
            }).format(dateToUse)
          : "Invalid Date"}
      </p>

      <div className="mt-1">
        <span className="badge badge-ghost badge-sm">{categoryLabel(expense.category)}</span>
      </div>

      <div className="flex justify-start">
        <button onClick={handleDelete} className="btn btn-error btn-sm mt-2">
          <FaTrashCan size={16} /> Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
