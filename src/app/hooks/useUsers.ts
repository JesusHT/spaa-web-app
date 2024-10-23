import { useState, useEffect } from 'react';

import { Profile } from '@/app/models/ProfileModel';
import { User } from '@/app/models/UserModel';

const useUsers = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [usersData, setUsersData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const [currentUser, setCurrentUser] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchUsersData = async () => {
            setLoading(true);
            try {
                const profileResponse = await fetch('/api/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!profileResponse.ok) {
                    const errorData = await profileResponse.json();
                    throw new Error(errorData.error || 'Error al obtener el perfil del usuario');
                }

                const profileData: Profile = await profileResponse.json();
                setCurrentUser(profileData);

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
                const users: User[] = data.body;

                if (!Array.isArray(users)) {
                    throw new Error('La respuesta de la API no es un array');
                }

                const filteredUsers = users.filter(user => {
                    const sameModule = user.id_modules === profileData.user.id_modules;
                    const hasPermission = user.id_role >= profileData.user.id_role;
                    return sameModule && hasPermission;
                });

                setUsersData(filteredUsers);
            } catch (error: any) {
                setError(error.message || 'Error al obtener datos');
            } finally {
                setLoading(false);
            }
        };

        fetchUsersData();
    }, []);

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

    const filteredUsersData = usersData.filter(user => 
        (user.id_users && user.id_users.toString().includes(searchTerm)) || 
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
