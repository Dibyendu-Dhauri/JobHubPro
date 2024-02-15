import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { JobsContextProvider } from "./context/JobsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <JobsContextProvider>
        <App />
      </JobsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
