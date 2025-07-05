import { create } from 'zustand';
import { actionLogin } from '../api/auth';
import { persist } from 'zustand/middleware';

// 1.Create Store
const authStore = (set)=>({
  token:null,
  user:[],
  actionLoginWithZustand:async(value)=>{
    try{
      const res = await actionLogin(value)
      const { payload,token } = res.data
      // console.log(payload)
      // console.log(token)
      set({token: token, user:payload});
      return { success:true, role: payload.role };
    }catch(error){
      // console.log(error)
      return { success:false, message: error.response?.data?.message }
    }
  },
});

// 2.UseStore
const useAuthStore = create(persist(authStore,{name:'auth-store'}))

export default useAuthStore;