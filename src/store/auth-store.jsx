// src/store/authStore.js
import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set,get) => ({
      isLoggedIn: false,
      setToken: (token) => set({ token, isLoggedIn: !!token }),
      user: null,
      setUser: (user) => set({ user }),
      token: null,
      isAdmin: false,

      actionLogin: async (credential) => {
        try {
          const res = await axios.post("http://localhost:8899/api/auth/login", credential);
          const { token, payload } = res.data;

          set({
            isLoggedIn: true,
            user: payload,
            token,
            isAdmin: payload.role === "ADMIN"
          });

          return { success: true, role: payload.role };
        } catch (error) {
          return {
            success: false,
            message: error.response?.data?.message || "Login failed",
          };
        }
      },

      fetchCurrentUser: async () => {
        try {
          const res = await axios.get("http://localhost:8899/api/users/me", {
            headers: {
              Authorization: `Bearer ${get().token}`,
            },
          });
          set({ currentUser: res.data.user});
        } catch (err) {
          console.error("❌ Failed to fetch current user", err);
          get().logout()
        }
      },


      logout: () => {
        set({ isLoggedIn: false, user: null, token: null, isAdmin: false });
        // setTimeout(()=> {
        //   console.log('user after: ', userAuthStore.getState().user)
        // },500);

      },
    }
    ),
    {
      name: "auth-store"
    }
  ));

export default useAuthStore;



