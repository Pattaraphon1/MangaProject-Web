// src/store/anime-store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useAuthStore from "./auth-store";

const API_URL = "http://localhost:8899/api/anime";

const useAnimeStore = create(
  persist(
    (set, get) => ({
      animeList: [],
      allAnime: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      searchQuery: "",
      isSearching: false,
      showAddModal: false,
      startPage: 1,

      setShowAddModal: (show) => set({ showAddModal: show }),
      setStartPage: (page) => set({ startPage: page }),

      fetchAllAnime: async () => {
        try {
          const response = await axios.get(`${API_URL}`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });
          set({ allAnime: response.data });
        } catch (error) {
          console.error("❌ Failed to fetch all anime", error);
        }
      },

      fetchAnimeByPage: async (page = 1) => {
        set({ loading: true, error: null, isSearching: false, searchQuery: "" });
        try {
          const response = await axios.get(`${API_URL}?page=${page}`);
          const data = response.data;
          set({
            animeList: data.data || [],
            currentPage: data.currentPage || page,
            totalPages: data.totalPages || 1,
            loading: false,
          });
        } catch (error) {
          set({ error: error.message || "Failed to fetch anime", loading: false });
        }
      },

      fetchNewAnime: async () => {
        const { startPage, currentPage, fetchAnimeByPage } = get();
        try {
          const res = await axios.get(`${API_URL}/fetch?startPage=${startPage}&limit=3`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });
          await fetchAnimeByPage(currentPage);
          return res.data;
        } catch (error) {
          console.error("❌ Failed to fetch from Jikan", error);
          throw error;
        }
      },

      deleteAnimeById: async (malId) => {
        try {
          await axios.delete(`${API_URL}/${malId}`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });
          await get().fetchAnimeByPage(get().currentPage);
        } catch (error) {
          console.error("❌ Failed to delete anime", error);
        }
      },

      deleteAllAnime: async () => {
        try {
          const res = await axios.delete(`${API_URL}`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });
          set({ animeList: [] });
        } catch (error) {
          throw error;
        }
      },


      searchAnime: async (query) => {
        if (!query.trim()) return;
        set({ loading: true, error: null, isSearching: true, searchQuery: query });
        try {
          const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`);
          set({
            animeList: response.data || [],
            loading: false,
            currentPage: 1,
            totalPages: 1,
          });
        } catch (error) {
          set({ error: error.message || "Search failed", loading: false });
        }
      },

      clearAnime: () => set({ animeList: [], error: null, isSearching: false, searchQuery: "" }),
    }),
    { name: "anime-store" }
  )
);

export default useAnimeStore;
