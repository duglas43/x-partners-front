import { isRejectedWithValue } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const errorThunkMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (!isRejectedWithValue(action)) {
      return next(action);
    }
    if (!action?.payload?.response?.data?.message) return next(action);
    if (action?.payload?.response?.data?.message === "Incorrect refresh token")
      return next(action);
    enqueueSnackbar(action?.payload?.response?.data?.message, {
      variant: "error",
    });
    return next(action);
  };
