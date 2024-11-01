import { useState, useEffect } from 'react';
import { Model } from '@/app/models/ModelsModel';

const useModel = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loadingModel, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/model');
        
        if (!response.ok) {
          throw new Error('Error fetching model');
        }

        const data = await response.json();
        setModels(data.body);
      } catch (err) {
        setError('Failed to fetch model');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const fetchModelById = async (id_model: number): Promise<Model> => {
    try {
      const response = await fetch(`/api/model/${id_model}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching models');
      }
  
      const data = await response.json();

      return data.body[0] as Model;
    } catch (error) {
      console.error('Error al obtener el modelo:', error);
      throw error;
    }
  };

  return { models, loadingModel, error, fetchModelById };
};

export default useModel;