import axios from "axios";
import authService from "../features/auth/authService";

// Endpoints where a 401 is a normal failed attempt (bad credentials), not an
// expired session. The Login/Register pages report those through their own state.
const AUTH_ENDPOINTS = ["api/users/", "api/users/login"];

const isAuthRequest = (url?: string) => {
  if (!url) return false;
  const path = url.split("?")[0].replace(/^\//, "");
  return AUTH_ENDPOINTS.includes(path);
};

// A 401 on any other request means the stored token is missing, expired, or
// invalid. Clear it and send the user to /login instead of letting the caller
// retry with the same dead credentials.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (status === 401 && !isAuthRequest(url) && window.location.pathname !== "/login") {
      authService.logout();
      // Full reload so stale Redux state is dropped along with the token.
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
