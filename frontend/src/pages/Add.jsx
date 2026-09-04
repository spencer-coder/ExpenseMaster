import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense } from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CATEGORIES, DEFAULT_CATEGORY } from "../constants/categories";

function Add() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [date, setDate] = useState(null);

  const dispatch = useDispatch();
  const n = useNavigate();

  const { settings } = useSelector((state) => state.settings);

  const onSubmit = async (e) => {
    e.preventDefault();

    let isoDate = "";
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        isoDate = parsedDate.toISOString();
      } else {
        toast.error("Invalid date");
        return;
      }
    }

    await dispatch(createExpense({ text, amount, category, customDate: isoDate }));
    toast.success("Added expense: " + text);
    setText("");
    setAmount(undefined);
    setCategory(DEFAULT_CATEGORY);
    n("/dashboard");
    setDate(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-base-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Expense</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="text" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              placeholder="Enter name"
              onChange={(e) => setText(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount ?? ""}
              onChange={(e) => setAmount(e.target.value === "" ? undefined : Number(e.target.value))}
              placeholder={`Enter amount (${settings.currency})`}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Custom Date
            </label>
            <input
              id="default-datepicker"
              type="date"
              placeholder="Select date"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full max-w-xs"
              required
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn w-full btn-primary"
            disabled={!text || amount === undefined}
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
