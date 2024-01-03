import React from "react";
import { useNavigate, useLinkClickHandler } from "react-router-dom";
import { SignInForm } from "@/components/SignInForm";
import { Box, Typography, Link } from "@mui/material";
import { signInCardSx } from "./styles";
import { centerContainerSx } from "@/styles/styles";
import { useSignInMutation, useLazyGetMeQuery } from "@/store/api/api";
import { ApiError } from "@/axios";
import { SignInDto } from "@/@types";

export const SignInPage = () => {
  const [signIn] = useSignInMutation();
  const [getMe, { isSuccess: isMeSuccess }] = useLazyGetMeQuery();

  const navigate = useNavigate();
  const handleSubmit = async (values: SignInDto) => {
    try {
      const result = await signIn(values).unwrap();
      localStorage.setItem("token", result.access_token);
      await getMe();
      return result;
    } catch (error) {
      return error as ApiError;
    }
  };
  const handleLinkClick = useLinkClickHandler("/signup");

  React.useEffect(() => {
    if (isMeSuccess) {
      navigate("/");
    }
  }, [navigate, isMeSuccess]);
  return (
    <Box sx={centerContainerSx}>
      <Box sx={signInCardSx}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Sign In
        </Typography>
        <SignInForm onSubmit={handleSubmit} />
        <Typography variant="body2" component="p" sx={{ mt: 1 }}>
          Don't have an account?{" "}
          <Link href="/signup" onClick={handleLinkClick}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
