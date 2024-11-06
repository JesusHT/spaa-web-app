'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import EmptyState from '@/app/components/emptyState/table';
import useInventory from '@/app/hooks/useInventory';

import InventoryTable from '@/app/components/tables/Inventory';
import AddButton from '@/app/components/buttons/AddButton';
import RightArrowButton from '@/app/components/buttons/RightArrowButton';
import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';
import SearchForm from '@/app/components/inputs/search';
import SkeletonTable from '@/app/components/skeletons/skeletonTable'; 

const Inventory = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    loading, 
    error,
    paginatedInventoryData,
    handleView,
    handleEdit,
    handleDelete,
    handlePageChange,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm
  } = useInventory();

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

  return (
      <div className="flex-grow p-6">
        {error && <p>Error: {error}</p>}

        {successMessage && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}

        <>
          <h1 className="text-2xl font-bold mb-3">Inventario</h1>

          <div className="flex items-center space-x-4 justify-end">
            <SearchForm
              placeholderText="Buscar por folio, nombre o descripción..."
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <AddButton onClick={openFormAdd} />
          </div>

          {loading ? (
            <SkeletonTable />
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
  );
};

export default Inventory;
