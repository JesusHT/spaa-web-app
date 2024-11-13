import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InventoryItem } from '@/app/models/InventoryItem';
import { InventoryItemDetails } from '@/app/models/InventoryDetailsModel';

const useDashboard = (id_module: number) => { 
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const fetchInventoryData = async (id_module: number) => {
        setLoading(true);
        try {
            const response = await fetch('/api/inventory', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to fetch inventory data');

            const data = await response.json();
            
            const filteredData = data.body.filter((item: InventoryItem) => {
                return item.id_module === id_module && item.status !== 0;
            });

            setInventoryData(filteredData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id_module) {
            fetchInventoryData(id_module); 
        }
    }, [id_module]); 

    const fetchInventoryById = async (id_inventory: number): Promise<InventoryItem> => {
        try {
            const response = await fetch(`/api/inventory/${id_inventory}`, {
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

    const fetchInventoryDetailsById = async (id_inventory: number): Promise<InventoryItemDetails> => {
        try {
            const response = await fetch(`/api/inventory/get/${id_inventory}`, {
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
            return data.body[0] as InventoryItemDetails;
        } catch (error) {
            console.error('Error al obtener el inventario:', error);
            throw error;
        }
    };

    const handlePageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleView = async (id: number) => {
        router.push(`/inventario/ver/${id}`);
    };

    const handleEdit = async (id: number) => {
        router.push(`/inventario/editar/${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/inventory/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                sessionStorage.setItem('deleteSuccess', 'true');
                window.location.reload();
            } else {
                const data = await response.json();
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error al obtener el inventario:', error);
            throw error;
        }
    };

    const filteredInventoryData = inventoryData
        ? inventoryData.filter(item => 
            item.folio.toString().includes(searchTerm) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())

        )
        : [];

    const paginatedInventoryData = filteredInventoryData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredInventoryData.length / itemsPerPage);

    return {
        loading,
        error,
        paginatedInventoryData,
        handleView,
        handleEdit,
        handleDelete,
        handlePageChange,
        currentPage,
        setCurrentPage,
        totalPages,
        searchTerm,
        setSearchTerm,
        fetchInventoryById,
        fetchInventoryDetailsById
    };
};

export default useDashboard;
