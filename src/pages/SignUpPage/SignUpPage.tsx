import React from "react";
import { useNavigate, useLinkClickHandler } from "react-router-dom";
import { SignUpForm } from "@/components";
import { Box, Typography, Link } from "@mui/material";
import { signUpCardSx } from "./styles";
import { centerContainerSx } from "@/styles/styles";
import { useSignUpMutation, useLazyGetMeQuery } from "@/store/api/api";
import { ApiError } from "@/axios";
import { SignUpDto } from "@/@types";

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation();
  const [getMe, { isSuccess: isMeSuccess }] = useLazyGetMeQuery();
  const navigate = useNavigate();
  const handleSubmit = async (values: SignUpDto) => {
    try {
      const result = await signUp(values).unwrap();
      localStorage.setItem("token", result.access_token);
      await getMe();
      return result;
    } catch (error) {
      return error as ApiError;
    }
  };
  const handleLinkClick = useLinkClickHandler("/signin");

  React.useEffect(() => {
    if (isMeSuccess) {
      navigate("/");
    }
  }, [navigate, isMeSuccess]);
  return (
    <Box sx={centerContainerSx}>
      <Box sx={signUpCardSx}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Sign Up
        </Typography>
        <SignUpForm onSubmit={handleSubmit} />
        <Typography variant="body2" component="p" sx={{ mt: 1 }}>
          Already have an account?{" "}
          <Link href="/signin" onClick={handleLinkClick}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
