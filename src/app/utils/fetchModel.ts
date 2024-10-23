import { Model } from "@/app/models/ModelsModel";

export const fetchModel = async (id: number): Promise<Model> => {
    try {
      const response = await fetch(`/api/model/${id}`, {
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
  
      return data.body[0] as Model;
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
      throw error;
    }
  };
  