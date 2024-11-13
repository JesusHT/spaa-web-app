import { useState, useEffect } from 'react';
import { authenticateUser } from '../utils/auth';

export const useAuthentication = () => {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await authenticateUser();
      setIsAuthenticate(authenticated);
    };

    checkAuthentication();
  }, []);

  return isAuthenticate;
};