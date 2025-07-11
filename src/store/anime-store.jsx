// src/store/animeStore.js
import {create} from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8899/api/anime";

const useAnimeStore = create((set) => ({
  // state เดิม
  animeList: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  
  // state สำหรับ search
  searchQuery: "",
  isSearching: false,

  // fetch anime ปกติ (paginated)
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

  // fetch search result
  searchAnime: async (query) => {
    if (!query.trim()) return; // ถ้า query ว่างไม่ต้อง search
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
}));


export default useAnimeStore;
