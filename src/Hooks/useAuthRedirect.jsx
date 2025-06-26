import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../Context/State';

export const useAuthRedirect = (redirectPath = '/') => {
  const navigate = useNavigate();
  const { user, rol } = useGlobalStore();

  useEffect(() => {
    if (!user || !rol) {
      navigate(redirectPath); 
    }
  }, [user, rol, navigate, redirectPath]);

  return { user, rol };
};