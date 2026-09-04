import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import expenseReducer from "../features/expenses/expenseSlice";
import settingsReducer from "../features/settings/settingsSlice";
import budgetReducer from "../features/budget/budgetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    settings: settingsReducer,
    budget: budgetReducer,
  },
});
