import axios from "axios";
import authService from "../features/auth/authService";

// A 401 here is a bad password, not an expired session; the Login page reports it itself.
const AUTH_ENDPOINTS = ["api/users/", "api/users/login"];

const isAuthRequest = (url) => {
  if (!url) return false;
  const path = url.split("?")[0].replace(/^\//, "");
  return AUTH_ENDPOINTS.includes(path);
};

// Any other 401 means the stored token is dead: clear it and bounce to /login.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (status === 401 && !isAuthRequest(url) && window.location.pathname !== "/login") {
      authService.logout();
      // Full reload so stale Redux state goes with the token.
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
