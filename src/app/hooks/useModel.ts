import { useState, useEffect } from 'react';

interface model {
  id: number;
  name: string;
}

const useModel = () => {
  const [models, setModel] = useState<model[]>([]);
  const [loadingModel, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch('/api/model');
        
        if (!response.ok) {
          throw new Error('Error fetching model');
        }

        const data = await response.json();
        setModel(data.body);
      } catch (err) {
        setError('Failed to fetch model');
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, []);

  return { models, loadingModel, error };
};

export default useModel;
