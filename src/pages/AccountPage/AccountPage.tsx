import React from "react";
import { UpdateUserForm } from "@/components";
import { Box, Typography } from "@mui/material";
import { UpdateUserCardSx, centerContainerSx } from "./styles";
import { useGetMeQuery, useUpdateUserMutation } from "@/store/api/api";
import { UpdateUserDto } from "@/@types";

export const AccountPage = () => {
  const { data: meData } = useGetMeQuery();
  const [updateUser] = useUpdateUserMutation();
  const handleSubmit = async (data: UpdateUserDto) =>
    updateUser({ id: String(meData?._id), data }).unwrap();

  if (!meData) return null;
  return (
    <Box sx={centerContainerSx}>
      <Box sx={UpdateUserCardSx}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Account
        </Typography>
        <UpdateUserForm
          onSubmit={handleSubmit}
          initialValues={{
            name: meData?.name,
            photo: meData?.photo,
          }}
        />
      </Box>
    </Box>
  );
};
