import { PeopleTable } from "@/components";
import {
  pageContainerSx,
  pageItemSx,
  containerSx,
  tableContainerSx,
} from "@/styles/styles";
import { Box } from "@mui/material";

export const PeoplePage = () => {
  return (
    <Box sx={pageContainerSx}>
      <Box sx={pageItemSx}>
        <Box sx={containerSx}>
          <Box sx={tableContainerSx}>
            <PeopleTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
