// Budgets are keyed by "YYYY-MM".
export const toMonthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const currentMonth = () => toMonthKey(new Date());

// Effective date is customDate when set, else createdAt, matching the display rule.
export const expenseMonth = (expense) => {
  const date = new Date(expense.customDate || expense.createdAt);
  return Number.isNaN(date.getTime()) ? null : toMonthKey(date);
};
