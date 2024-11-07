import { useState, useEffect } from 'react';
import { Roles } from '@/app/models/RolesModel';

const useRoles = () => {
  const [roles, setRoles] = useState<Roles[]>([]);
  const [loadingRoles, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformRolesData = (apiData: any): Roles[] => {
    return apiData.map((item: any) => ({
      id: item.id_role, 
      name: item.role_name
    }));
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        
        if (!response.ok) {
          throw new Error('Error fetching roles');
        }

        const data = await response.json();
        const transformedRoles = transformRolesData(data.body);
        
        setRoles(transformedRoles);
      } catch (err) {
        setError('Failed to fetch roles');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const fetchRolesById = async (id_roles: number): Promise<Roles> => {
    try {
      const response = await fetch(`/api/roles/${id_roles}`, {
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
  
      return data.body[0] as Roles;
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
      throw error;
    }
  };

  return { roles, loadingRoles, error, fetchRolesById};
};

export default useRoles;