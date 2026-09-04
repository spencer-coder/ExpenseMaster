// Keep the `value`s in sync with the category enum in backend/models/expense.js.
// Mongoose rejects any value not in that enum.
export const CATEGORIES = [
  { value: "food", label: "Food & Drink" },
  { value: "transport", label: "Transport" },
  { value: "housing", label: "Housing" },
  { value: "utilities", label: "Utilities" },
  { value: "health", label: "Health" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "other", label: "Other" },
];

// Expenses created before categories existed have no `category` field. Mongoose
// defaults apply on write, not on read, so those documents come back undefined.
export const DEFAULT_CATEGORY = "other";

export const categoryLabel = (value) =>
  CATEGORIES.find((c) => c.value === (value || DEFAULT_CATEGORY))?.label ?? "Other";
