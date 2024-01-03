import { createTheme } from "@mui/material/styles";

declare module "@mui/system" {
  interface Theme {
    drawerWidth: number;
    appBarHeight: number;
  }
  interface ThemeOptions {
    drawerWidth?: number;
    appBarHeight?: number;
  }
}

export const theme = createTheme({
  drawerWidth: 240,
  appBarHeight: 65,
});
