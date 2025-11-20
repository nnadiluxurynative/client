import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../_lib/axios";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "../_schemas/auth";
import { GenericAPIResponse } from "../_types/api";
import { AuthResponse, AuthState } from "../_types/auth";
import { User } from "../_types/user";
import { handleErrorMessage } from "../_utils/helpers";
import { useOrdersStore } from "./orderStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      setAccessToken: (token) => set({ accessToken: token }),

      loginUser: async (data) => {
        const { fetchOrders } = useOrdersStore.getState();
        try {
          // Validate data
          const parsed = loginSchema.parse(data);

          // Make axios call
          const loginRes = await API.post<AuthResponse>("/auth/login", parsed);

          // Set access token
          set({ accessToken: loginRes.data.accessToken });

          // Get profile
          const profileRes = await API.get<GenericAPIResponse<User>>(
            "/auth/get-profile"
          );

          // Set user data
          set({ user: profileRes.data.data });

          // Fetch user orders
          await fetchOrders();
        } catch (err: any) {
          const message = handleErrorMessage(err, "Login failed");
          throw Error(message);
        }
      },

      signupUser: async (data) => {
        try {
          // Validate data
          const parsed = signupSchema.parse(data);

          // Send request
          const signupRes = await API.post<AuthResponse>(
            "/auth/signup",
            parsed
          );

          // Set access token
          set({ accessToken: signupRes.data.accessToken });

          // Get profile
          const profileRes = await API.get<GenericAPIResponse<User>>(
            "/auth/get-profile"
          );
          // Set user data
          set({ user: profileRes.data.data });
        } catch (err: any) {
          const message = handleErrorMessage(err, "Sign up failed");
          throw Error(message);
        }
      },

      forgotPassword: async (data) => {
        try {
          // Validate data
          const parsed = forgotPasswordSchema.parse(data);

          // Send request
          const res = await API.post<GenericAPIResponse<any>>(
            "/auth/forgot-password",
            parsed
          );

          return res.data.message;
        } catch (err: any) {
          const message = handleErrorMessage(err, "Something went wrong");
          throw Error(message);
        }
      },

      resetPassword: async (data, token) => {
        try {
          // Validate data
          const parsed = resetPasswordSchema.parse(data);
          // Send request
          await API.patch<GenericAPIResponse<any>>(
            `/auth/reset-password/${token}`,
            parsed
          );
        } catch (err: any) {
          const message = handleErrorMessage(err, "Something went wrong");
          throw Error(message);
        }
      },

      refreshAuth: async () => {
        const { fetchOrders } = useOrdersStore.getState();
        const { logoutUser, user, accessToken } = get();
        try {
          // Will use cookie-based refresh token automatically
          const res = await API.post<AuthResponse>("/auth/refresh-token");
          const newToken = res.data.accessToken;
          // Set new access token
          set({ accessToken: newToken });

          // Fetch user profile once refreshed
          const profileRes = await API.get<GenericAPIResponse<User>>(
            "/auth/get-profile"
          );

          // Set user data
          set({ user: profileRes.data.data });

          // Fetch user orders
          await fetchOrders();
        } catch (err: any) {
          console.error("Refresh failed:", err);

          // Logout user if they were authenticated
          if (user || accessToken) await logoutUser();
        }
      },

      logoutUser: async () => {
        // Send request
        try {
          await API.post("/auth/logout");
        } catch {
        } finally {
          // Clear user and access token
          setTimeout(() => {
            set({ accessToken: null, user: null });
          }, 2000);
          // Clear persisted data from localStorage
          localStorage.clear();
          // Redirect to login if on a protected route
          if (window.location.pathname.startsWith("/account"))
            window.location.replace("/login");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
