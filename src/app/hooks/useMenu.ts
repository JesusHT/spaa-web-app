import { useState, useEffect } from 'react';

const useMenu = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        
        if (data.auth && data.user) {
          setUserData({
            auth: data.auth,
            user: data.user
          });
        } else {
          throw new Error('Incomplete profile data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (!userData) {
      fetchUserData(); 
    }
  }, [userData]);

  return {
    userData,
    error,
  };
};

export default useMenu;
