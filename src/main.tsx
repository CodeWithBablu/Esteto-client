import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global/index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster />
    </AuthContextProvider>
  </React.StrictMode>,
);
