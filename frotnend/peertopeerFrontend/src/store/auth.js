import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import apiInstance from "../utils/axios";

const useAuthstore= create((set,get)=>({
allUserData:null,
loading:false,
user:()=>({
user_id: get().allUserData?.user_id||null,
username: get().allUserData?.username||null,
  email: get().allUserData?.email || null,
  category: get().allUserData?.category || null,

}),
setUser:(user)=>set({

    allUserData:user,
}),

setLoading: (loading) => set({ loading }), 



//  setToken: (token) => {
//     set({ token });
//     // Store token in localStorage for persistence
//     if (token) {
//       localStorage.setItem('auth_token', token);
//     } else {
//       localStorage.removeItem('auth_token');
//     }
//   },

//
isLoggedIn:()=>get().allUserData !==null,

// Method to initialize auth state from localStorage
  initializeAuth: async () => {
    try {
      set({ loading: true });
      
      // Get token from localStorage
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedToken) {
        set({ token: storedToken });
        
        // Verify token and get user data
       const {data} = await apiInstance.post('/auth/token/verify/', {
          token: storedToken 
        });
        
        if (data.user) {
          set({ 
            allUserData: data.user,
            token: storedToken 
          });
        }
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Clear invalid token
      localStorage.removeItem('auth_token');
      set({ 
        token: null, 
        allUserData: null 
      });
    } finally {
      set({ loading: false });
    }
  },


}));

if (import.meta.env.DEV){
    mountStoreDevtool("Store", useAuthstore);
}

export {useAuthstore};