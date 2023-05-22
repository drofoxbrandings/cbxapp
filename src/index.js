import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const container = document.getElementById("root");
const root = createRoot(container);

const theme = createTheme({
  palette: {
    primary: {
      main: "#8f6d26",
    },
    secondary: {
      main: "#002652e8",
      light: '#1C5FB0'
    },
    white: {
      main: "#ffffff",
    },
    error: {
      main: "#d32f2f",
    },
  },
});

root.render(
  <Router>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
