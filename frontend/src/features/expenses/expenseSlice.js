import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import expenseService from "./expenseService";

const initialState = {
  expenses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new expense

export const createExpense = createAsyncThunk("expsense/create", async (expenseData, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    return await expenseService.createExpense(expenseData, token || "");
  } catch (error) {
    console.error("Error in register thunk:", error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user expenses
export const getExpenses = createAsyncThunk("expense/getAll", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;

    return await expenseService.getExpenses(token || "");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete expense
export const deleteExpense = createAsyncThunk("expsense/delete", async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    await expenseService.deleteExpense(id, token || "");
    return { id };
  } catch (error) {
    console.error("Error in register thunk:", error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get user expenses
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete expense
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.expenses = state.expenses.filter((expense) => expense._id !== action.payload.id);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;
