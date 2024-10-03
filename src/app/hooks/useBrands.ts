import { useState, useEffect } from 'react';

interface Brands {
  id: number;
  name: string;
}

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

  return { brands, loadingBrands, error };
};

export default useBrands;
