import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import budgetService from "./budgetService";

const initialState = {
  budget: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getBudget = createAsyncThunk("budget/get", async (month, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    return await budgetService.getBudget(month, token || "");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const setBudget = createAsyncThunk("budget/set", async ({ month, amount }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.user?.token;
    return await budgetService.setBudget(month, amount, token || "");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        // A month with no budget set resolves to null, which is a normal state.
        state.budget = action.payload;
      })
      .addCase(getBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budget = action.payload;
      })
      .addCase(setBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default budgetSlice.reducer;
