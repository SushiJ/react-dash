import { AppBar, Box, IconButton, InputBase, Toolbar } from "@mui/material";
import {
  Sun,
  Moon,
  MagnifyingGlass,
  Gear,
  List,
  // CaretDown,
} from "@phosphor-icons/react";
import { useThemeMode } from "../context/Mode";
import useThemeWrapper from "../hooks/useThemeWrapper";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar(props: NavbarProps) {
  const theme = useThemeWrapper();
  const context = useThemeMode();

  function toggleMode() {
    theme.palette.mode !== "dark"
      ? context?.setMode("dark")
      : context?.setMode("light");
  }

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => props.setSidebarOpen((prev) => !prev)}>
            <List />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              p: "0.1rem 1.5rem",
              borderRadius: "9px",
            }}
            bgcolor={theme.palette.background.alt}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
          </Box>
        </Box>
        <Box gap="1rem" display="flex">
          <IconButton onClick={toggleMode}>
            {theme.palette.mode === "dark" ? <Moon /> : <Sun />}
          </IconButton>
          <IconButton>
            <Gear />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
