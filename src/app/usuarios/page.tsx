'use client';

import React, { useState, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { useRouter } from 'next/navigation';

import EmptyState from '../components/emptyState/table';
import useUsers from '../hooks/useUsers';
import Menu from '../ui/nav-links';
import UsersTable from '../components/tables/users'; 
import AddButton from '../components/buttons/AddButton';
import RightArrowButton from '../components/buttons/RightArrowButton';
import LeftArrowButton from '../components/buttons/LeftArrowButton';
import SearchForm from '../components/input/search';

const Users = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isAuthenticated = useAuthentication();
  const router = useRouter();

  const {
    loading, 
    error,
    paginatedUsersData,
    handleView,
    handleEdit,
    handleDelete,
    handlePageChange,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm
  } = useUsers();

  useEffect(() => {
    const insertSuccess = sessionStorage.getItem('insertSuccess');
    if (insertSuccess) {
      setSuccessMessage('Usuario insertado correctamente');
      sessionStorage.removeItem('insertSuccess'); 
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, []);

  const openFormAdd = () => {
    router.push('/usuarios/agregar');
  };

  if (isAuthenticated === null) {
    return <h1>Cargando...</h1>;
  }

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <div className="flex">
      <Menu /> 
      <div className="flex-grow p-6">
        {error && <p>Error: {error}</p>}

        {successMessage && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}

        <>
          <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

          <div className="flex items-center space-x-4">
            <SearchForm
              placeholderText="Buscar por ID o nombre"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <AddButton onClick={openFormAdd} />
          </div>

          {loading ? (
            <p>Cargando datos de usuarios...</p> 
          ) : paginatedUsersData.length === 0 ? (
            <EmptyState
              message="No se encontraron resultados de usuarios."
              icon="fa-search-minus"
              onAction={openFormAdd}
              actionLabel="Agregar un nuevo usuario"
            />
          ) : (
            <>
              <UsersTable
                usersData={paginatedUsersData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {totalPages > 1 && (
                <div className="flex justify-between mt-4">
                  {currentPage > 1 && (
                    <LeftArrowButton onClick={() => handlePageChange('prev')} />
                  )}
                  <span>Página {currentPage} de {totalPages}</span>
                  {currentPage < totalPages && (
                    <RightArrowButton onClick={() => handlePageChange('next')} />
                  )}
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Users;
