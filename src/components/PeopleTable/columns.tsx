import { GridColDef } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { UserDto } from "@/@types";

export const peopleTableColumns: GridColDef<UserDto>[] = [
  {
    field: "photo",
    headerName: "avatar",
    valueGetter: (params) =>
      `${import.meta.env.VITE_APP_API_URL}/files/file/${
        params.row.photo.filename
      }`,
    renderCell: ({ value }) => (
      <Avatar
        src={value}
        alt={"avatar"}
        imgProps={{
          crossOrigin: "anonymous",
        }}
      />
    ),
    flex: 0.1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    type: "number",
    minWidth: 50,
  },
  {
    field: "name",
    headerName: "name",
    flex: 0.5,
    sortable: false,
    minWidth: 150,
  },
  {
    field: "birthday",
    headerName: "age",
    valueGetter: ({ value }) =>
      new Date().getFullYear() - new Date(value).getFullYear(),
    flex: 0.5,
    sortable: false,
    minWidth: 150,
  },
];
