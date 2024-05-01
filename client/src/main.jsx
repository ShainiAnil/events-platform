import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
    <GoogleOAuthProvider
        clientId={
          "740347793379-f6f6eqbkvhlqrnn8e3disj1ie32dr5ma.apps.googleusercontent.com"
        }
      >
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
