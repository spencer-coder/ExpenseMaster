import { store } from "../app/store";

// Function to get settings from the store
function getSettings() {
  const state = store.getState();
  return state.settings.settings;
}

// Function to format currency based on settings
export function formatCurrency(amount) {
  const settings = getSettings();
  const formatter = new Intl.NumberFormat(navigator.language || "en-US", {
    style: "currency",
    currency: settings.currency || "USD",
  });
  return formatter.format(amount);
}
