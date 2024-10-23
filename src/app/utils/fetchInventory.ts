import { InventoryItem } from "@/app/models/InventoryItem";

export const fetchInventory = async (id: number): Promise<InventoryItem> => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
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
  
      return data.body[0] as InventoryItem;
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
      throw error;
    }
  };
  