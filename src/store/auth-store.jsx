// src/store/authStore.js
import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    isLoggedIn: !!token,
    user: user || null,
    token: token || null,

    actionLoginWithZustand: async (credentials) => {
      try {
        const res = await axios.post("http://localhost:8899/api/auth/login", credentials);
        const { token, payload } = res.data;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(payload));

        set({ isLoggedIn: true, user: payload, token });

        return { success: true, role: payload.role };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Login failed",
        };
      }
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ isLoggedIn: false, user: null, token: null });
    },
  };
});

export default useAuthStore;




// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { actionLogin } from '../api/auth.api';

// // 1.Create Store
// const authStore = (set)=>({
//   token:null,
//   user:[],
  
//   actionLoginWithZustand:async(value)=>{
//     try{
//       const res = await actionLogin(value)
//       const { payload,token } = res.data
//       // console.log(payload)
//       // console.log(token)
//       set({token: token, user:payload});
//       return { success:true, role: payload.role };
//     }catch(error){
//       // console.log(error)
//       return { success:false, message: error.response?.data?.message }
//     }
//   },
// });

// // 2.UseStore
// const useAuthStore = create(persist(authStore,{name:'auth-store'}))

// export default useAuthStore;

