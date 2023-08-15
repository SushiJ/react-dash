import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
}
