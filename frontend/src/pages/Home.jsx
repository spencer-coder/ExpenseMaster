import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getExpenses, reset } from "../features/expenses/expenseSlice";
import ExpenseItem from "../components/ExpenseItem";
import Loading from "../components/Loading";
import { FaPlus } from "react-icons/fa6";
import WeeklyChart from "../components/WeeklyChart";
import BudgetProgress from "../components/BudgetProgress";
import StatTiles from "../components/StatTiles";
import CategoryBreakdown from "../components/CategoryBreakdown";
import { CATEGORIES, DEFAULT_CATEGORY } from "../constants/categories";
import { getBudget } from "../features/budget/budgetSlice";
import { currentMonth } from "../utils/month";

function Home() {
  const n = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { expenses, isLoading } = useSelector((state) => state.expenses);
  const { budget } = useSelector((state) => state.budget);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) {
      n("/login");
      return;
    }
    dispatch(getExpenses());
    dispatch(getBudget(currentMonth()));
  }, [user, n, dispatch]);

  // Clear expense state when leaving the page.
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Filtering narrows only the visible list; the cards above stay on the full set.
  const visibleExpenses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...expenses]
      .filter((expense) => {
        const category = expense.category || DEFAULT_CATEGORY;
        if (categoryFilter !== "all" && category !== categoryFilter) return false;
        if (query && !expense.text?.toLowerCase().includes(query)) return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.customDate || a.createdAt);
        const dateB = new Date(b.customDate || b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
  }, [expenses, categoryFilter, search]);

  // Block only the first load; a spinner on every refetch would flash the layout away.
  if (isLoading && expenses.length === 0) {
    return <Loading />;
  }

  const monthLabel = new Intl.DateTimeFormat(navigator.language, {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="w-full max-w-6xl px-4 pt-24 pb-16 mx-auto">
      <header className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Hello, {user && user.name} 👋</h1>
        <p className="text-sm text-base-content/60">{monthLabel}</p>
      </header>

      <StatTiles expenses={expenses} />

      <div className="grid gap-4 mt-4 lg:grid-cols-2">
        <BudgetProgress expenses={expenses} budget={budget} />
        <WeeklyChart expenses={expenses} />
      </div>

      <div className="grid gap-4 mt-4 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4">
          <CategoryBreakdown expenses={expenses} />
        </div>

        <section className="lg:col-span-7 xl:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="font-semibold">Recent transactions</h2>
            <span className="text-sm text-base-content/60">
              {visibleExpenses.length}
              {visibleExpenses.length !== expenses.length && ` of ${expenses.length}`}
            </span>
          </div>

          <div className="flex flex-col gap-2 mb-4 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions"
              className="w-full input input-bordered sm:flex-1"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full select select-bordered sm:w-52"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {visibleExpenses.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleExpenses.map((expense) => (
                <ExpenseItem key={expense._id} expense={expense} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-sm text-center rounded-xl bg-base-200 text-base-content/60">
              {expenses.length > 0 ? (
                "No transactions match your filters"
              ) : (
                <>
                  No expenses yet.{" "}
                  <Link to="/add" className="link link-primary">
                    Add your first one
                  </Link>
                  .
                </>
              )}
            </div>
          )}
        </section>
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
    </div>
  );
}

export default Home;
