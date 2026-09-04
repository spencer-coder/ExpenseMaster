// Calendar-month helpers. Budgets are keyed by "YYYY-MM".

export const toMonthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const currentMonth = () => toMonthKey(new Date());

// An expense's effective date is its customDate when set, otherwise createdAt --
// the same rule ExpenseItem and WeeklyChart use for display and grouping.
export const expenseMonth = (expense) => {
  const date = new Date(expense.customDate || expense.createdAt);
  return Number.isNaN(date.getTime()) ? null : toMonthKey(date);
};
