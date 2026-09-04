import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { IconContext } from "react-icons";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./app/axiosInterceptor.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ErrorBoundary>
      <IconContext.Provider value={{ size: "1.4em" }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>{" "}
      </IconContext.Provider>
    </ErrorBoundary>
  </Provider>,
);
