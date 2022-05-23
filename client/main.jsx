import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./src/styles/theme";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Source Sans Pro', sans-serif;
    background: #FFFFFF;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </ThemeProvider>
);
