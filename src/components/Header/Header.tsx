import React, { FC } from "react";
import {
  AppBar,
  Toolbar,
  AppBarProps,
  Box,
  IconButton,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuList,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { api } from "@/store/api/api";

export interface HeaderProps extends AppBarProps {
  onDrawerToggle: () => void;
  title: string;
  onLogout: () => void;
}
export const Header: FC<HeaderProps> = ({
  onDrawerToggle,
  title,
  onLogout,
  ...appBarProps
}) => {
  const { data } = api.endpoints.getMe.useQueryState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        ...appBarProps?.sx,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      {...appBarProps}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              onDrawerToggle();
            }}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="text"
            sx={{ color: "white" }}
            onClick={handleClick}
            endIcon={
              <Avatar
                src={`${import.meta.env.VITE_APP_API_URL}/files/file/${
                  data?.photo.filename
                }`}
                alt={"avatar"}
                imgProps={{
                  crossOrigin: "anonymous",
                }}
              />
            }
          ></Button>
        </Stack>
      </Toolbar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuList>
          <MenuItem
            onClick={() => {
              onLogout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </AppBar>
  );
};
