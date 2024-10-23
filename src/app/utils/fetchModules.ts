import { Modules } from "@/app/models/ModulesModel";

export const fetchModules = async (id: number): Promise<Modules> => {
    try {
      const response = await fetch(`/api/modules/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener el inventario');
      }
  
      const data = await response.json();
  
      return data.body[0] as Modules;
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
      throw error;
    }
  };
  