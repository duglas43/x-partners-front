import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { store } from "./store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
