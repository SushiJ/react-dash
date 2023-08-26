import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useGetUserQuery } from "../features/api";

const USER_ID = "63701cc1f03239b7f700000e";

export default function Layout() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const { data } = useGetUserQuery(USER_ID);
  return (
    <Box display={!isMobile ? "flex" : "block"} width={"100%"} height={"100%"}>
      <Sidebar
        user={data}
        drawerWidth="250px"
        isMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar user={data} sidebarOpen setSidebarOpen={setSidebarOpen} />
        <Outlet />
      </Box>
    </Box>
  );
}
