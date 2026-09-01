import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getExpenses, reset } from "../features/expenses/expenseSlice";
import ExpenseItem from "../components/ExpenseItem";
import Loading from "../components/Loading";
import ThemeSwitcher from "../components/ThemeSwitch";
import { FaPlus, FaWallet } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import WeeklyChart from "../components/WeeklyChart";

function Home() {
  const n = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading } = useSelector((state) => state.expenses);

  useEffect(() => {
    if (!user) {
      n("/login");
      return;
    }
    dispatch(getExpenses());
  }, [user, n, dispatch]);

  // Clear expense state when leaving the page
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  // Calculate total income for all time
  const totalIncome = expenses
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  // Calculate total expenses for all time
  const totalExpenses = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  // Calculate actual balance
  const actualBalance = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-24">
      <h3 className="text-3xl font-bold">Hello, {user && user.name} 👋</h3>

      <div
        className={`flex items-center justify-between gap-8 w-96 h-24 p-4 rounded-xl shadow-lg ${
          actualBalance >= 0 ? "bg-primary" : "bg-error"
        } text-primary-content`}
      >
        <div>
          <p>My Balance</p>
          <p className="text-2xl font-semibold">{formatCurrency(actualBalance)}</p>
        </div>
        <div>
          <FaWallet className="text-3xl" />
        </div>
      </div>

      <WeeklyChart expenses={expenses} />

      <div>
        <p className="mb-2 ml-2">Recent Transactions</p>
        {sortedExpenses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedExpenses.map((expense) => (
              <ExpenseItem key={expense._id} expense={expense} />
            ))}
          </div>
        ) : (
          <p>No expenses found</p>
        )}
      </div>
      <Link to="/add">
        <button
          className="fixed bottom-5 right-5 btn btn-circle btn-primary btn-lg tooltip tooltip-left"
          data-tip="Add New Expense"
        >
          <div className="flex items-center justify-center w-full h-full">
            <FaPlus />
          </div>
        </button>
      </Link>
      <ThemeSwitcher />
    </div>
  );
}

export default Home;
