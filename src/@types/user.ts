import { GENDER } from ".";
import { FileDto } from ".";

export interface UserDto {
  _id: string;
  name: string;
  email: string;
  birthday: string;
  gender: GENDER;
  photo: FileDto;
}

export interface UpdateUserDto {
  name?: string;
  password?: string;
  photo?: File;
}
