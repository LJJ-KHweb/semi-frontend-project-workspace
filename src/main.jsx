import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <GlobalStyle />
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
