import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email provided"),
  password: z.string(),
});

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email("Invalid email provided"),
  password: z.string().min(8, "Password must be 8+ characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email provided"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be 8+ characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
  });

export type LoginInput = z.infer<typeof loginSchema>;

export type SignupInput = z.infer<typeof signupSchema>;

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
