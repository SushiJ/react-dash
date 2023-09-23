import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Sun,
  Moon,
  MagnifyingGlass,
  Gear,
  List,
  CaretDown,
} from "@phosphor-icons/react";

import { useThemeMode } from "../context/Mode";
import useThemeWrapper from "../hooks/useThemeWrapper";
import { NavbarProps } from "../types/shared";

export default function Navbar(props: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useThemeWrapper();
  const context = useThemeMode();

  const isOpen = Boolean(anchorEl);

  function toggleMode() {
    theme.palette.mode !== "dark"
      ? context?.setMode("dark")
      : context?.setMode("light");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
          <Box>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src="https://placeholder.photo/img/500?bg_color=be185d&text="
                height="20px"
                width="20px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box
                textAlign="left"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    fontWeight="semi-bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {props.user?.name ?? "Not Like This"}
                  </Typography>
                  <Typography
                    fontStyle="italic"
                    fontSize=".75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {props.user?.occupation ?? "Not Like This"}
                  </Typography>
                </Box>
              </Box>
              <CaretDown size="30px" color={theme.palette.secondary[300]} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
