import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InventoryItem } from '@/app/models/InventoryItem';

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
            
            const filteredData = data.body.filter((item: InventoryItem) => item.id_module === id_module);
            setInventoryData(filteredData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventoryData(id_module); 
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

    const handleDelete = (id: number) => {
        alert(`Delete item ${id}`);
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
        fetchInventoryById
    };
};

export default useDashboard;
