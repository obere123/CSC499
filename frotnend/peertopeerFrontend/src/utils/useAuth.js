import { useAuthstore } from '../store/auth';

export const useAuth = () => {
  const store = useAuthstore();

  return {
    ...store,
    isAuthenticated: store.isLoggedIn(),
    currentUser: store.user(),
  };
};
