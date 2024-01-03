import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { UpdateUserDto, UserDto } from "@/@types";
import {
  UpdateUserFormSx,
  getDropZoneRootSx,
  photoContainerSx,
} from "./styles";
import {
  TextField,
  Button,
  Box,
  BoxProps,
  FormLabel,
  Typography,
} from "@mui/material";
import { ApiError } from "@/axios";

export interface UpdateUserFormInitialValues
  extends Pick<UserDto, "name" | "photo"> {}
export interface UpdateUserFormProps
  extends Partial<Omit<BoxProps<"form">, "onSubmit">> {
  initialValues?: UpdateUserFormInitialValues;
  onSubmit: (data: UpdateUserDto) => Promise<UserDto | ApiError>;
}
export const UpdateUserForm: FC<UpdateUserFormProps> = ({
  onSubmit,
  initialValues,
  ...boxProps
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    defaultValues: {
      name: initialValues?.name,
      photo: undefined,
    },
  });

  const [imageURL, setImageURL] = React.useState<string | undefined>(
    `${import.meta.env.VITE_APP_API_URL}/files/file/${
      initialValues?.photo?.filename
    }`
  );
  const handleDrop = (acceptedFiles: File[]) => {
    setValue("photo", acceptedFiles[0]);
    setImageURL(URL.createObjectURL(acceptedFiles[0]));
  };
  const onSumbitData = async (data: UpdateUserDto) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (!data[key]) return;
      if (data[key] instanceof FileList) return;
      formData.append(key, data[key]);
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
      sx={UpdateUserFormSx}
      onSubmit={handleSubmit(onSumbitData)}
      encType="multipart/form-data"
      {...boxProps}
    >
      <Box>
        <Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Avatar
          </Typography>
          <Box sx={photoContainerSx}>
            <img
              src={imageURL}
              alt="avatar"
              height="100px"
              width="100%"
              crossOrigin="anonymous"
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
        <FormLabel htmlFor="photo">Update avatar</FormLabel>
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
            <p>Upload new photo</p>
          )}
        </Box>
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
        {...register("password")}
        size="small"
        label="Password"
        type="password"
        aria-invalid={errors.password ? "true" : "false"}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button type="submit" fullWidth variant="contained">
        Update account
      </Button>
    </Box>
  );
};
