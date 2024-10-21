import { useState, useEffect } from 'react';

const useDashboard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [inventoryData, setInventoryData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchInventoryData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/inventory', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('Failed to fetch inventory data');

                const data = await response.json();
                setInventoryData(data.body);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventoryData();
    }, []);

    const handlePageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentPage < totalPages) {
          setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleView = (id: number) => {
        alert(`View details for item ${id}`);
    };

    const handleEdit = (id: number) => {
        alert(`Edit item ${id}`);
    };

    const handleDelete = (id: number) => {
        alert(`Delete item ${id}`);
    };

    const filteredInventoryData = inventoryData
        ? inventoryData.filter(item => 
            item.id_inventory.toString().includes(searchTerm) ||
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
        setSearchTerm
    };
};

export default useDashboard;
