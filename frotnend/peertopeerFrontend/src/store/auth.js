import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import apiInstance from "../utils/axios";

const useAuthstore = create((set, get) => ({
  allUserData: null,
  loading: false,
  token: null, // Added missing token property
  
  user: () => ({
    user_id: get().allUserData?.user_id || null,
    username: get().allUserData?.username || null,
    email: get().allUserData?.email || null,
    category: get().allUserData?.category || null,
  }),
  
  setUser: (user) => set({
    allUserData: user,
  }),

  setLoading: (loading) => set({ loading }),

  setToken: (token) => {
    set({ token });
    // Store token in localStorage for persistence
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  },

  isLoggedIn: () => get().allUserData !== null,

  // Method to clear auth state (logout)
  clearAuth: () => {
    localStorage.removeItem('auth_token');
    set({
      allUserData: null,
      token: null,
      loading: false
    });
  },

  // Method to initialize auth state from localStorage
  initializeAuth: async () => {
    try {
      set({ loading: true });
      
      // Get token from localStorage
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedToken) {
        // Set token first
        set({ token: storedToken });
        
        // Verify token and get user data
        const { data } = await apiInstance.post('/auth/token/verify/', {
          token: storedToken 
        });
        
        if (data.user) {
          set({ 
            allUserData: data.user,
            token: storedToken 
          });
        } else {
          // If no user data, clear everything
          get().clearAuth();
        }
      } else {
        // No token found, ensure state is clear
        set({
          allUserData: null,
          token: null
        });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Clear invalid token and auth state
      get().clearAuth();
    } finally {
      set({ loading: false });
    }
  },

  // Method to login with credentials
  login: async (credentials) => {
    try {
      set({ loading: true });
      
      const response = await apiInstance.post('/auth/login/', credentials);
      
      if (response.data.token && response.data.user) {
        const { token, user } = response.data;
        
        // Set token in localStorage
        localStorage.setItem('auth_token', token);
        
        // Update store state
        set({
          token,
          allUserData: user,
          loading: false
        });
        
        return { success: true, user };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login failed:', error);
      set({ loading: false });
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed' 
      };
    }
  },

  // Method to logout
  logout: () => {
    get().clearAuth();
  }
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("AuthStore", useAuthstore);
}

export { useAuthstore };