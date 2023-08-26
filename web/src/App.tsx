import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { useThemeMode } from "./context/Mode";
import { themeSettings } from "./theme";

import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";
import Geography from "./pages/Geography";

function App() {
  const context = useThemeMode();
  if (!context) {
    throw new Error("Bruh");
  }
  const mode = context.mode;
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
