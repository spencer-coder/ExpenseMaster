// Keep these values in sync with the category enum in backend/models/expense.js.
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

// Expenses predating categories read back as undefined: Mongoose defaults apply on write, not read.
export const DEFAULT_CATEGORY = "other";

export const categoryLabel = (value) =>
  CATEGORIES.find((c) => c.value === (value || DEFAULT_CATEGORY))?.label ?? "Other";
