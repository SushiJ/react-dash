import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ModeProvider } from "./context/Mode";
import { useMode } from "./hooks/useTheme";
import { useMemo } from "react";
import { themeSettings } from "./theme";

function Provider({ children }: { children: JSX.Element }) {
  const { mode } = useMode();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ModeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ModeProvider>
  );
}

function App() {
  const { setMode } = useMode();
  return (
    <Provider>
      <>
        <p className="">Click on the Vite and React logos to learn more</p>
        <button onClick={() => setMode("light")}>Switch theme</button>
      </>
    </Provider>
  );
}

export default App;
