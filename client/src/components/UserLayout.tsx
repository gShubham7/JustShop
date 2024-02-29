import { Box } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Box width="90%" m="auto">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default UserLayout;
