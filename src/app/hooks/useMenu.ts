import { useState, useEffect } from 'react';

const useMenu = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const PROTECTED_ROUTE = "http://localhost:4000/protected-route ";
  const GET_USER_API = "http://localhost:4000//api/usuarios/";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(PROTECTED_ROUTE, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data.message.id_auth) {
          const queryResponse = await fetch(`${GET_USER_API}${data.message.id_auth}`, {
            method: 'GET',
            credentials: 'include',
          });

          if (!queryResponse.ok) throw new Error('Failed to fetch additional data');

          const queryData = await queryResponse.json();
          const user = queryData.body[0];

          setUserData(user);
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
