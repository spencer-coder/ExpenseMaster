import axios from "axios";

const API_URL = "api/expenses/";

// Reusable config function
const createConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Create new expense
const createExpense = async (expenseData, token) => {
  const response = await axios.post(API_URL, expenseData, createConfig(token));
  return response.data;
};

// get user expenses
const getExpenses = async (token) => {
  const response = await axios.get(API_URL, createConfig(token));
  return response.data;
};

// delete expense
const deleteExpense = async (expenseId, token) => {
  const response = await axios.delete(API_URL + expenseId, createConfig(token));
  return response.data;
};

const expenseService = {
  createExpense,
  getExpenses,
  deleteExpense,
};
export default expenseService;
