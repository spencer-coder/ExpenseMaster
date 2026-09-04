import axios from "axios";

const API_URL = "api/budgets/";

// Reusable config function
const createConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get the overall budget for a month. Resolves to null when none is set.
const getBudget = async (month, token) => {
  const response = await axios.get(`${API_URL}?month=${month}`, createConfig(token));
  return response.data;
};

// Create or replace the overall budget for a month.
const setBudget = async (month, amount, token) => {
  const response = await axios.put(API_URL, { month, amount }, createConfig(token));
  return response.data;
};

const budgetService = {
  getBudget,
  setBudget,
};
export default budgetService;
