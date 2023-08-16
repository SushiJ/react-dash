import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  return (
    <Box display={!isMobile ? "flex" : "block"} width={"100%"} height={"100%"}>
      <Sidebar
        drawerWidth="250px"
        isMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar sidebarOpen setSidebarOpen={setSidebarOpen} />
        <Outlet />
      </Box>
    </Box>
  );
}
