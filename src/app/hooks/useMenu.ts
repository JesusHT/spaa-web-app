import { useState, useEffect } from 'react';
import { Profile } from '@/app/models/ProfileModel';

const useMenu = () => {
  const [userData, setUserData] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data: Partial<Profile> = await response.json();

        if (data.auth && data.user) {
          setUserData({
            auth: data.auth,
            user: data.user,
          });
        } else {
          throw new Error('Incomplete profile data');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (!userData && !error) {
      fetchUserData();
    }
  }, [userData, error]);

  return {
    userData,
    error,
    loading,
  };
};

export default useMenu;
