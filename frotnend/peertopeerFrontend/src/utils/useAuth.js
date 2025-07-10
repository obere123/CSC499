import { useAuthstore } from '../store/auth';

export const useAuth = () => {
  // ✅ Subscribe directly — these lines are new:
  const allUserData = useAuthstore((state) => state.allUserData);
  const loading = useAuthstore((state) => state.loading);

  return {
    // ✅ This part stays similar, but uses `allUserData` directly:
    isAuthenticated: !!allUserData,
    currentUser: {
      user_id: allUserData?.user_id || null,
      username: allUserData?.username || null,
      email: allUserData?.email || null,
      category: allUserData?.category || null,
    },
    loading,

    // ✅ Add direct passthrough for actions if you still use them:
    setUser: useAuthstore((state) => state.setUser),
    setLoading: useAuthstore((state) => state.setLoading),
    initializeAuth: useAuthstore((state) => state.initializeAuth),
  };
};
