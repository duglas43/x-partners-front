import GroupIcon from "@mui/icons-material/Group";
import AccountCircle from "@mui/icons-material/AccountCircle";

export interface SidebarSchema {
  text: string;
  link: string;
  icon: JSX.Element;
}

export const SIDEBAR_SCHEMA: SidebarSchema[] = [
  {
    text: "Account",
    link: "/",
    icon: <AccountCircle />,
  },
  {
    text: "People",
    link: "/people",
    icon: <GroupIcon />,
  },
];
