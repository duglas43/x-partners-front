import React, { FC } from "react";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { useGetUsersExceptMeQuery } from "@/store/api/api";
import { peopleTableColumns } from "./columns";

export interface PeopleTableProps extends Partial<DataGridProps> {}
export const PeopleTable: FC<PeopleTableProps> = (props) => {
  const { data, isLoading } = useGetUsersExceptMeQuery(undefined);
  return (
    <DataGrid
      columns={peopleTableColumns}
      rows={data || []}
      getRowId={(row) => row._id}
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      hideFooter
      loading={isLoading || props?.loading}
      {...props}
    />
  );
};
