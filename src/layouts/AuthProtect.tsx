import { FC } from "react";
import { api } from "@/store/api/api";
import { Outlet, Navigate } from "react-router-dom";

export const AuthProtect: FC = () => {
  const { isSuccess, isLoading, isError } = api.endpoints.getMe.useQueryState();
  if (isLoading) {
    return <></>;
  }
  if (isSuccess) {
    return <Outlet />;
  }
  if (isError) {
    return <Navigate to="/signin" />;
  }
  return <></>;
};
