import { Brands } from "@/app/models/BrandModel";

export const fetchBrands = async (id: number): Promise<Brands> => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
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
  
      return data.body[0] as Brands;
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
      throw error;
    }
  };
  