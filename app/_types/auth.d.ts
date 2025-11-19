import {
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
} from "../_schemas/auth";
import { User } from "./user";

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  loginUser: (data: LoginInput) => Promise<void>;
  signupUser: (data: SignupInput) => Promise<void | string>;
  forgotPassword: (data: ForgotPasswordInput) => Promise<void | string>;
  logoutUser: () => Promise<void>;
  setAccessToken: (token: string) => void;
  resetPassword: (data: ResetPasswordInput, token: string) => Promise<void>;
  refreshAuth: () => Promise<void>;
};

export type AuthResponse = {
  status: "success" | "fail" | "error";
  message?: string;
  accessToken?: string;
};
