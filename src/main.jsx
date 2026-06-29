import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalStyle } from "./styles/GlobalStyle";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
);
