'use client'

import React, { useState, useEffect } from 'react';
import Menu from '../ui/nav-links';
import InventoryTable from '../components/tables/Inventory';
import AddButton from '../components/buttons/AddButton';
import EmptyState from '../components/emptyState/table';
import { useAuthentication } from '../hooks/useAuthentication';
import { useRouter } from 'next/navigation';
import useInventory from '../hooks/useInventory';

const Inventory = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isAuthenticated = useAuthentication();
  const router = useRouter();

  const {
    loading, 
    error,
    paginatedInventoryData,
    handleView,
    handleEdit,
    handleDelete,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm
  } = useInventory();

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    const insertSuccess = sessionStorage.getItem('insertSuccess');
    if (insertSuccess) {
      setSuccessMessage('Elemento insertado correctamente');
      sessionStorage.removeItem('insertSuccess'); 
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, []);

  const openFormAdd = () => {
    router.push('/inventario/agregar');
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
          <h1 className="text-2xl font-bold mb-4">Inventario</h1>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ID, nombre o descripción..."
            className="mr-2 p-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out w-full sm:w-auto"
          />

          <AddButton onClick={openFormAdd} />

          {loading ? (
            <p>Cargando datos de inventario...</p> 
          ) : paginatedInventoryData.length === 0 ? (
            <EmptyState
              message="No se encontraron resultados en el inventario."
              icon="fa-search-minus"
              onAction={openFormAdd}
              actionLabel="Agregar un nuevo elemento"
            />
          ) : (
            <>
              <InventoryTable
                inventoryData={paginatedInventoryData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {totalPages > 1 && (
                <div className="flex justify-between mt-4">
                  {currentPage > 1 && (
                    <button
                      onClick={() => handlePageChange('prev')}
                      className="px-4 py-2 bg-black rounded"
                    >
                      <i className="fa-solid fa-arrow-left-long"></i> 
                      Anterior
                    </button>
                  )}
                  <span>Página {currentPage} de {totalPages}</span>
                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange('next')}
                      className="px-4 py-2 bg-black  rounded"
                    >
                      Siguiente
                      <i className="fa-solid fa-arrow-right-long"></i> 
                    </button>
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

export default Inventory;
