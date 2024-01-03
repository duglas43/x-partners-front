import { SxProps, Theme } from "@mui/system";

export const UpdateUserFormSx: SxProps<Theme> = () => ({
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const photoContainerSx: SxProps<Theme> = () => ({
  borderRadius: 2,
  position: "relative",
  transition: "background-color .2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});
export const photoRemoveButtonSx: SxProps<Theme> = () => ({
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: 1,
  borderRadius: 2,
});

export const dropZoneRootAcceptSx: SxProps<Theme> = (theme) => ({
  borderColor: theme.palette.success.main,
});
export const dropZoneRootFocusSx: SxProps<Theme> = (theme) => ({
  borderColor: theme.palette.primary.main,
});
export const dropZoneRootRejectSx: SxProps<Theme> = (theme) => ({
  borderColor: theme.palette.error.main,
});

export const getDropZoneRootSx =
  (
    isDragAccept: boolean,
    isDragReject: boolean,
    isFocused: boolean
  ): SxProps<Theme> =>
  (theme) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    width: "100%",
    ...(isDragAccept && dropZoneRootAcceptSx(theme)),
    ...(isDragReject && dropZoneRootRejectSx(theme)),
    ...(isFocused && dropZoneRootFocusSx(theme)),
  });
