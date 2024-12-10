import { useState, useEffect } from 'react';
import { Profile } from '@/app/models/ProfileModel';

const useUserUpdate = () => {
    
    const fetchUserById = async ( id_user : number ) : Promise<Profile> => {
        try {
            const response = await fetch(`/api/users/get/${id_user}`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Error al obtener el marcas');
            }

            const data = await response.json();
            
            return data as Profile;
          } catch (error) {
            console.error('Error al obtener las marcas:', error);
            throw error;
          }
    };

    return { fetchUserById }

}

export default useUserUpdate;