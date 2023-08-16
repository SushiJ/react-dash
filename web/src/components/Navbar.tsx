import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";
import {
  Sun,
  Moon,
  MagnifyingGlass,
  Gear,
  List,
  // CaretDown,
} from "@phosphor-icons/react";
import { useThemeMode } from "../context/Mode";

export default function Navbar() {
  const theme = useTheme();
  const context = useThemeMode();

  function toggleMode() {
    theme.palette.mode !== "dark"
      ? context?.setMode("dark")
      : context?.setMode("light");
  }
  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton>
            <List style={{ color: `${theme.palette.background.paper}` }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "3rem",
              p: "0.1rem 1.5rem",
              borderRadius: "9px",
            }}
            bgcolor={theme.palette.background.paper}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
          </Box>
        </Box>
        <Box gap="1.5rem">
          <IconButton onClick={toggleMode}>
            {theme.palette.mode === "dark" ? (
              <Moon style={{ color: `${theme.palette.secondary.main}` }} />
            ) : (
              <Sun style={{ color: `${theme.palette.secondary.light}` }} />
            )}
          </IconButton>
          <IconButton>
            <Gear />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
