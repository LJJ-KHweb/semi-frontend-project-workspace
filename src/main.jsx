import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import App from "./App.jsx";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AuthProvider } from "./context/AuthContext";
import { Theme } from "./styles/theme";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <GlobalStyle />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
