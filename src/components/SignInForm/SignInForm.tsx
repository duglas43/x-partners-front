import React, { FC } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInDto, AccessDto } from "@/@types";
import { signInFormSx } from "./styles";
import { TextField, Button, Box, BoxProps } from "@mui/material";
import { ApiError } from "@/axios";

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export interface SignInFormProps
  extends Partial<Omit<BoxProps<"form">, "onSubmit">> {
  onSubmit: (data: SignInDto) => Promise<AccessDto | ApiError>;
}
export const SignInForm: FC<SignInFormProps> = ({ onSubmit, ...boxProps }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Box
      component="form"
      sx={signInFormSx}
      onSubmit={handleSubmit(onSubmit)}
      {...boxProps}
    >
      <TextField
        fullWidth
        {...register("email")}
        size="small"
        label="Email"
        aria-invalid={errors.email ? "true" : "false"}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        type="password"
        size="small"
        label="Password"
        {...register("password")}
        aria-invalid={errors.password ? "true" : "false"}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button type="submit" fullWidth variant="contained">
        Sign In
      </Button>
    </Box>
  );
};
