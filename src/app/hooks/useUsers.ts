import { useState, useEffect } from 'react';
import { Profile } from '@/app/models/ProfileModel';

const useUsers = (id_module: number, id_role: number, id_users: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [usersData, setUsersData] = useState<Profile[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUsersData = async (id_module: number, id_role: number,  id_users: number) => {
            setLoading(true);
            try {
                const usersResponse = await fetch('/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!usersResponse.ok) {
                    const errorData = await usersResponse.json();
                    throw new Error(errorData.error || 'Error al obtener la lista de usuarios');
                }

                const data = await usersResponse.json();

                const filteredData = data.filter((profiles : Profile) => 
                    profiles.user.id_modules === id_module && profiles.auth.id_role > id_role && profiles.user.id_users !== id_users
                );
                
                setUsersData(filteredData);

            } catch (error: any) {
                setError(error.message || 'Error al obtener datos');
            } finally {
                setLoading(false);
            }
        };

        fetchUsersData(id_module, id_role, id_users);
    }, [id_module, id_role, id_users]);

    const handlePageChange = (direction: 'next' | 'prev') => {
        const totalPages = Math.ceil(usersData.length / itemsPerPage);
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleView = (id: number) => {
        alert(`Ver detalles del usuario ${id}`);
    };

    const handleEdit = (id: number) => {
        alert(`Editar usuario ${id}`);
    };

    const handleDelete = (id: number) => {
        alert(`Eliminar usuario ${id}`);
    };

    const filteredUsersData = usersData.filter(profile => 
        (profile.user.id_users && profile.user.id_users.toString().includes(searchTerm)) || 
        (profile.user.name && profile.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const paginatedUsersData = filteredUsersData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredUsersData.length / itemsPerPage);

    return {
        loading,
        error,
        paginatedUsersData,
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

export default useUsers;
