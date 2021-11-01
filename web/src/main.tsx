import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "@/contexts/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
