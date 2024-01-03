import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { SignUpDto, AccessDto } from "@/@types";
import {
  signUpFormSx,
  getDropZoneRootSx,
  photoContainerSx,
  photoRemoveButtonSx,
} from "./styles";
import {
  TextField,
  Button,
  Box,
  BoxProps,
  MenuItem,
  FormLabel,
  Typography,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ApiError } from "@/axios";
import { GENDER } from "@/@types";

export interface SignUpFormProps
  extends Partial<Omit<BoxProps<"form">, "onSubmit">> {
  onSubmit: (data: SignUpDto) => Promise<AccessDto | ApiError>;
}
export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, ...boxProps }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignUpDto>({
    defaultValues: {
      gender: GENDER.M,
    },
  });

  const [imageURL, setImageURL] = React.useState<string | undefined>(undefined);
  const handleDrop = (acceptedFiles: File[]) => {
    setValue("photo", acceptedFiles[0]);
    setImageURL(URL.createObjectURL(acceptedFiles[0]));
  };
  const handleImageRemove = () => {
    setValue("photo", undefined);
    setImageURL(undefined);
  };
  const onSumbitData = async (data: SignUpDto) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof SignUpDto]);
    });
    await onSubmit(formData as any);
  };

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isFocused,
    isDragActive,
  } = useDropzone({
    accept: { "image/*": [".png", ".jpeg", ".jpg"] },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
    onDrop: handleDrop,
  });

  return (
    <Box
      component="form"
      sx={signUpFormSx}
      onSubmit={handleSubmit(onSumbitData)}
      encType="multipart/form-data"
      {...boxProps}
    >
      <Box>
        <FormLabel sx={{}}>Avatar</FormLabel>
        <Box
          {...getRootProps()}
          sx={getDropZoneRootSx(isDragAccept, isDragReject, isFocused)}
        >
          <TextField
            fullWidth
            {...getInputProps()}
            {...register("photo")}
            color="warning"
            size="small"
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : getValues("photo")?.name ? (
            <p>Upload new photo</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select</p>
          )}
        </Box>
        {getValues("photo")?.name && (
          <Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              Recieved photo
            </Typography>
            <Box sx={photoContainerSx}>
              <IconButton
                onClick={handleImageRemove}
                sx={photoRemoveButtonSx}
                size="small"
                aria-label="remove photo"
                title="remove photo"
              >
                <ClearIcon />
              </IconButton>
              <img
                src={imageURL}
                alt="avatar"
                height="100px"
                width="100%"
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Box>
        )}
      </Box>

      <TextField
        fullWidth
        {...register("name", {
          required: "Name is required",
        })}
        size="small"
        label="Name"
        aria-invalid={errors.name ? "true" : "false"}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        fullWidth
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        size="small"
        label="Email"
        aria-invalid={errors.email ? "true" : "false"}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        {...register("password", {
          required: "Password is required",
        })}
        size="small"
        label="Password"
        type="password"
        aria-invalid={errors.password ? "true" : "false"}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        fullWidth
        {...register("birthday", {
          required: "birthday is required",
        })}
        size="small"
        label="Birth date"
        type="date"
        InputLabelProps={{ shrink: true }}
        aria-invalid={errors.birthday ? "true" : "false"}
        error={!!errors.birthday}
        helperText={errors.birthday?.message}
      />

      <TextField
        fullWidth
        {...register("gender", {
          required: "gender is required",
        })}
        select
        size="small"
        label="Gender"
        defaultValue={GENDER.M}
        aria-invalid={errors.gender ? "true" : "false"}
        error={!!errors.gender}
        helperText={errors.gender?.message}
      >
        <MenuItem dense key="M" value="M">
          Male
        </MenuItem>
        <MenuItem dense key="W" value="W">
          Female
        </MenuItem>
      </TextField>

      <Button type="submit" fullWidth variant="contained">
        Sign Up
      </Button>
    </Box>
  );
};
