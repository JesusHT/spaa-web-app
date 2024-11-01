import { useState, useEffect } from 'react';
import { Brands } from '@/app/models/BrandModel';

const useBrands = () => {
  const [brands, setBrands] = useState<Brands[]>([]);
  const [loadingBrands, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        
        if (!response.ok) {
          throw new Error('Error fetching brands');
        }

        const data = await response.json();
        setBrands(data.body);
      } catch (err) {
        setError('Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const fetchBrandsById = async (id_brands: number): Promise<Brands> => {
    try {
      const response = await fetch(`/api/brands/${id_brands}`, {
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
  
      return data.body[0] as Brands;
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
      throw error;
    }
  };

  return { brands, loadingBrands, error, fetchBrandsById};
};

export default useBrands;
