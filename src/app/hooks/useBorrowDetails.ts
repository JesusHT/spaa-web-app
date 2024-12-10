import { useState, useEffect } from 'react';
import { BorrowModel } from '@/app/models/BorrowModel';
import { BorrowObjectModel } from '@/app/models/BorrowObjectModel';

const UseBorrowDetails = () => {
    const [Borrow, setBorrow] = useState<BorrowModel[]>([]);
    const [BorrowDetails, setBorrowDetails] = useState<BorrowObjectModel[]>([]);
    const [isModalOpen, setIsModalOpen]   = useState(false);

    const fetchBorrowById = async (id_borrow: number): Promise<BorrowModel> => {
        try {
          const response = await fetch(`/api/borrow/${id_borrow}`, {
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
          
          return data.body[0] as BorrowModel;
        } catch (error) {
          console.error('Error al obtener las marcas:', error);
          throw error;
        }
    };
    
    const fetchDetailsBorrowById = async (id_borrow: number): Promise<BorrowObjectModel> => {
        try {
          const response = await fetch(`/api/borrow/details/${id_borrow}`, {
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
          
          return data.body as BorrowObjectModel;
        } catch (error) {
          console.error('Error al obtener las marcas:', error);
          throw error;
        }
    };

    const handleDeleteClick = (id: number, folio: number) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleConfirmDelete = async (id: number) => {
        await handleDelete(id)
        setIsModalOpen(false);
    };


    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/borrow/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const data = await response.json();
                console.error(data.error || 'An error occurred')
            }
        } catch (error) {
            console.error('Error al eliminar el préstamo:', error);
            throw error;
        }
    };


    return { fetchBorrowById, fetchDetailsBorrowById, handleConfirmDelete, closeModal, isModalOpen, handleDeleteClick}
}

export default UseBorrowDetails;