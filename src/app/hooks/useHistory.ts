import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BorrowModel } from '@/app/models/BorrowModel';

const useHistory = (id_module: number) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [borrowData, setBorrowData] = useState<BorrowModel[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const fetchBorrowData = async (id_module: number) => {
        setLoading(true);
        try {
            const response = await fetch('/api/borrow', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to fetch borrow data');

            const data = await response.json();


            const filteredData = data.body.filter((item: BorrowModel) => {
                return item.id_modules === id_module;
            });

            setBorrowData(filteredData);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id_module) {
            fetchBorrowData(id_module);
        }
    }, [id_module]);

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
                throw new Error(errorData.error || 'Error al obtener el préstamo');
            }

            const data = await response.json();
            return data.body[0] as BorrowModel;
        } catch (error) {
            console.error('Error al obtener el préstamo:', error);
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
        router.push(`/historial/ver/${id}`);
    };

    const handleEdit = async (id: number) => {
        router.push(`/historial/editar/${id}`);
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
                sessionStorage.setItem('deleteSuccess', 'true');
                window.location.reload();
            } else {
                const data = await response.json();
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error al eliminar el préstamo:', error);
            throw error;
        }
    };

    const filteredBorrowData = borrowData
        ? borrowData.filter(item =>
            item.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.practice_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const paginatedBorrowData = filteredBorrowData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredBorrowData.length / itemsPerPage);

    return {
        loading,
        error,
        paginatedBorrowData,
        handleView,
        handleEdit,
        handleDelete,
        handlePageChange,
        currentPage,
        setCurrentPage,
        totalPages,
        searchTerm,
        setSearchTerm,
        fetchBorrowById,
    };
};

export default useHistory;