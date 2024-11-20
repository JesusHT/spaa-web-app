'use client';

import React, { useState, useEffect } from 'react';
import { useProfile } from '@/app/context/profileContext';

import EmptyState from '@/app/components/emptyState/table';
import useBorrow from '@/app/hooks/useHistory'; 
import BorrowTable from '@/app/components/tables/borrow';
import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';
import RightArrowButton from '@/app/components/buttons/RightArrowButton';
import SearchForm from '@/app/components/inputs/search';
import SkeletonTable from '@/app/components/skeletons/skeletonTable';

const History = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { profile } = useProfile();
  const idModule = profile?.user.id_modules || 0; 

  const {
    loading,
    error,
    paginatedBorrowData,
    handleView,
    handleEdit,
    handleDelete,
    handlePageChange,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
  } = useBorrow(idModule);

  useEffect(() => {
    const deleteSuccess = sessionStorage.getItem('deleteSuccess');
    if (deleteSuccess) {
      setSuccessMessage('Préstamo eliminado correctamente.');
      sessionStorage.removeItem('deleteSuccess');
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, []);

  return (
    <div className="flex-grow p-6">
      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
          {successMessage}
        </div>
      )}

      <>
        <h1 className="text-2xl font-bold mb-3">Historial</h1>

        <div className="flex items-center space-x-4 justify-end">
          <SearchForm
            placeholderText="Buscar por solicitante, docente o práctica..."
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {loading ? (
          <SkeletonTable />
        ) : paginatedBorrowData.length === 0 ? (
          <EmptyState
            message="No se encontraron resultados en el historial."
            icon="fa-search-minus"
          />
        ) : (
          <>
            <BorrowTable
              borrowData={paginatedBorrowData}
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

export default History;