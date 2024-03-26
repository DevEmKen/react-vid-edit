import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./LandingPage.tsx";
import "./styles/index.css";

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  </React.StrictMode>
);
