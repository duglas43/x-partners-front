import { SxProps, Theme } from "@mui/system";

export const UpdateUserCardSx: SxProps<Theme> = () => ({
  maxWidth: "400px",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 2,
  px: 2,
  py: 2,
});

export const centerContainerSx: SxProps<Theme> = (theme) => ({
  height: `calc(100% - ${theme.appBarHeight}px)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: 2,
});
