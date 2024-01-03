import React, { FC } from "react";
import { Box, Drawer, Toolbar } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";
import { Sidebar, SIDEBAR_SCHEMA } from "@/components/Sidebar";
import { temporaryDrawerSx, permanentDrawerSx, mainSx } from "@/styles/styles";

export interface AppLayoutProps {}
export const AppLayout: FC<AppLayoutProps> = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignSelf: "stretch", height: "100%" }}>
        <Header
          onDrawerToggle={() => {
            handleDrawerToggle();
          }}
          title={
            SIDEBAR_SCHEMA.find(
              (item) => item.link === `/${location.pathname.split("/")[1]}`
            )?.text || ""
          }
          onLogout={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        />
        <Box
          component="nav"
          sx={{ flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={temporaryDrawerSx}
          >
            <Toolbar />
            <Sidebar schema={SIDEBAR_SCHEMA} />
          </Drawer>
          <Drawer variant="permanent" sx={permanentDrawerSx} open>
            <Toolbar />
            <Sidebar schema={SIDEBAR_SCHEMA} />
          </Drawer>
        </Box>
        <Box component="main" sx={mainSx}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
