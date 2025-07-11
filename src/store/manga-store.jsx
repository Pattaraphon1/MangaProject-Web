// src/store/mangaStore.js
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8899/api/manga";

const useMangaStore = create((set) => ({
  mangaList: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,

  searchQuery: "",
  isSearching: false,

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

  clearManga: () => set({ mangaList: [], error: null, isSearching: false, searchQuery: "" }),
}));

export default useMangaStore;
