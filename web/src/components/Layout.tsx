import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useGetUserQuery } from "../features/api";

const USER_ID = "64df0c633a0f634577f9ac1c";

export default function Layout() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const { data } = useGetUserQuery(USER_ID);
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
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </Box>
  );
}
