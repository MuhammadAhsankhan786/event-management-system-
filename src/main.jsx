import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import "./App.css"; // ✅ Importing CSS file for styling
import React from "react";

// src/main.jsx
// import "./index.css"; // ya './style.css' — jo aap use kar rahe ho

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
