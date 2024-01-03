import { GENDER } from "./global";
export interface AccessDto {
  access_token: string;
}
export interface SignInDto {
  email: string;
  password: string;
}
export type SignUpDto = {
  name: string;
  email: string;
  password: string;
  birthday: string;
  gender: GENDER;
  photo: File;
};
