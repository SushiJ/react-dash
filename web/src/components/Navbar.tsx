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
import { ThemeSettingType } from "../theme";

export default function Navbar() {
  const theme = useTheme<ThemeSettingType>();
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
            <List style={{ color: `${theme.palette.secondary.main}` }} />
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
            bgcolor={theme.palette.background.alt}
          >
            <InputBase
              placeholder="Search..."
              style={{ color: `${theme.palette.secondary.main}` }}
            />
            <IconButton>
              <MagnifyingGlass
                style={{ color: `${theme.palette.secondary.main}` }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box gap="1.5rem">
          <IconButton onClick={toggleMode}>
            {theme.palette.mode === "dark" ? (
              <Moon style={{ color: `${theme.palette.secondary.main}` }} />
            ) : (
              <Sun style={{ color: `${theme.palette.secondary.main}` }} />
            )}
          </IconButton>
          <IconButton>
            <Gear style={{ color: `${theme.palette.secondary.main}` }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
