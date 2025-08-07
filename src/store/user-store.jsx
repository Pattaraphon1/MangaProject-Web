import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAuthStore from "./auth-store";

const API_URL = "http://localhost:8899/api/users";

export const useUserStore = create(
    persist(
        (set, get) => ({
            userList: [],
            currentUser: null,
            loading: false,
            error: null,

            clearUserState: () => {
                set({ userList: [], currentUser: null });
            },

            fetchAllUsers: async () => {
                set({ loading: true, error: null });
                try {
                    const res = await axios.get(`${API_URL}`, {
                        headers: {
                            Authorization: `Bearer ${useAuthStore.getState().token}`,
                        },
                    });
                    set({ userList: res.data.result, loading: false });
                } catch (err) {
                    console.error("❌ Failed to fetch users", err);
                    set({ error: err.message || "Failed", loading: false });
                }
            },

            searchUser: async (query) => {
                set({ loading: true, error: null });
                try {
                    const res = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
                        headers: {
                            Authorization: `Bearer ${useAuthStore.getState().token}`,
                        },
                    });
                    set({ userList: res.data.result, loading: false });
                } catch (err) {
                    console.error("❌ Failed to search users", err);
                    set({ error: err.message || "Failed", loading: false });
                }
            },

            updateUserById: async (id, updatedData) => {
                try {
                    const res = await axios.put(`${API_URL}/${id}`, updatedData, {
                        headers: {
                            Authorization: `Bearer ${useAuthStore.getState().token}`,
                        },
                    });

                    const updatedUser = res.data.updated || updatedData;
                    set((state) => ({
                        userList: state.userList.map((user) =>
                            user.id === id ? { ...user, ...updatedUser } : user
                        ),
                    }));
                } catch (err) {
                    console.error("❌ Failed to update user", err);
                    throw err;
                }
            },

            updateCurrentUser: async (updatedData) => {
                try {
                    const res = await axios.put(`${API_URL}/me`, updatedData, {
                        headers: {
                            Authorization: `Bearer ${useAuthStore.getState().token}`,
                        },
                    });
                    set({ currentUser: res.data.user });
                } catch (err) {
                    console.error("❌ Failed to update current user", err);
                    throw err;
                }
            },

            deleteUserById: async (id) => {
                try {
                    await axios.delete(`${API_URL}/${id}`, {
                        headers: {
                            Authorization: `Bearer ${useAuthStore.getState().token}`,
                        },
                    });
                    await get().fetchAllUsers();
                } catch (err) {
                    console.error("❌ Failed to delete user", err);
                }
            },

            resetUserStore: () => {
                set({
                    userList: [],
                    currentUser: null,
                    loading: false,
                    error: null
                });
            },

            setCurrentUser: (user) => set({ currentUser: user }),
        }),
        {
            name: "user-store",
        }
    )
);

export default useUserStore;
