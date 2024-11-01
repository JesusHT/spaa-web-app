import { useState, useEffect } from 'react';
import { Modules } from "@/app/models/ModulesModel";

const useModules = () => {
    const fetchModulesById = async (id_modules: number): Promise<Modules> => {
        try {
          const response = await fetch(`/api/modules/${id_modules}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener los modulos');
          }
      
          const data = await response.json();
      
          return data.body[0] as Modules;
        } catch (error) {
          console.error('Error al obtener los modulos:', error);
          throw error;
        }
    };

    return { fetchModulesById };
}

export default useModules