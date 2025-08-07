import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useAuthStore from "./auth-store";

const API_URL = "http://localhost:8899/api/manga";

const useMangaStore = create(
  persist(
    (set, get) => ({
      mangaList: [],
      allManga: [],
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

      fetchAllManga: async () => {
        try {
          const response = await axios.get(`${API_URL}/fetch`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });
          set({ allManga: response.data });
        } catch (error) {
          console.error("❌ Failed to fetch all manga", error);
        }
      },

      fetchMangaByPage: async (page = 1) => {
        set({ loading: true, error: null, isSearching: false, searchQuery: "" });
        try {
          const response = await axios.get(`${API_URL}?page=${page}`);
          const data = response.data;
          set({
            mangaList: data.data || [],
            currentPage: data.currentPage || page,
            totalPages: data.totalPages || 1,
            loading: false,
          });
        } catch (error) {
          set({ error: error.message || "Failed to fetch manga", loading: false });
        }
      },

      fetchNewManga: async () => {
        const { startPage, currentPage, fetchMangaByPage } = get();
        try {
          const res = await axios.get(`${API_URL}/fetch?startPage=${startPage}&limit=3`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });
          await fetchMangaByPage(currentPage);
          return res.data;
        } catch (error) {
          console.error("❌ Failed to fetch from Jikan", error);
          throw error;
        }
      },

      deleteMangaById: async (malId) => {
        try {
          await axios.delete(`${API_URL}/${malId}`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },
          });
          await get().fetchMangaByPage(get().currentPage);
        } catch (error) {
          console.error("❌ Failed to delete manga", error);
        }
      },

      deleteAllManga: async () => {
        try {
          const res = await axios.delete(`${API_URL}`, {
            headers: {
              Authorization: `Bearer ${useAuthStore.getState().token}`,
            },}); 
          set({ mangaList: [] });
        } catch (error) {
          throw error;
        }
      },

      searchManga: async (query) => {
        if (!query.trim()) return;
        set({ loading: true, error: null, isSearching: true, searchQuery: query });
        try {
          const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`);
          set({
            mangaList: response.data || [],
            loading: false,
            currentPage: 1,
            totalPages: 1,
          });
        } catch (error) {
          set({ error: error.message || "Search failed", loading: false });
        }
      },

      clearManga: () =>
        set({ mangaList: [], error: null, isSearching: false, searchQuery: "" }),
    }),
    { name: "manga-store" }
  )
);

export default useMangaStore;
