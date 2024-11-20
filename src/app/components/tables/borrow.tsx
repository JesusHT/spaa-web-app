import React, { useState } from 'react';

import Button from '@/app/components/buttons/Button';
import { BorrowModel } from '@/app/models/BorrowModel';
import { format } from "date-fns";
import { es } from "date-fns/locale";

type HistoryTableProps = {
    borrowData: BorrowModel[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

const HistoryTable: React.FC<HistoryTableProps> = ({ borrowData, onView, onEdit}) => {

  const handleDeleteClick = (id: number, account_number: string) => {
    alert(`Item ${id}`)
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate) return "Fecha no válida";
    try {
      return format(new Date(isoDate), "dd/MM/yyyy", { locale: es });
    } catch {
      return "Fecha no válida";
    }
  };

  if (!borrowData) return null;

  return (
    <div>
      <table className="min-w-full bg-white border mt-5 text-black border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-6 text-left text-gray-600">Número de Cuenta</th>
            <th className="py-3 px-6 text-left text-gray-600">Nombre</th>
            <th className="py-3 px-6 text-left text-gray-600">Fecha de Inicio</th>
            <th className="py-3 px-6 text-left text-gray-600">Estatus</th>
            <th className="py-3 px-6 text-left text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {borrowData.map((item) => (
            <tr key={item.id_borrow} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">{item.num_account}</td>
              <td className="py-3 px-6">{item.applicant}</td>
              <td className="py-3 px-6">{formatDate(item.date_start)}</td>
              <td className="py-3 px-6">
                {item.status === 1 ? (
                  <span className="text-green-600 font-bold">Activo</span>
                ) : (
                  <span className="text-gray-500">Entregado</span>
                )}
              </td>
              <td className="py-3 px-6 flex space-x-2">
                <Button 
                    onClick={() => onView(item.id_borrow)}
                    textColor='white'
                    bgColor='bg-green-700'
                    bgColorHover='bg-green-800'
                    icon='fa-eye'
                    text='Ver'
                />
                <Button 
                    onClick={() => onEdit(item.id_borrow)}
                    textColor='white'
                    bgColor='bg-yellow-400'
                    bgColorHover='bg-yellow-500'
                    icon='fa-pen-to-square'
                    text='Editar'
                />
                <Button 
                    onClick={() => handleDeleteClick(item.id_borrow, item.num_account.toString())}
                    textColor='white'
                    bgColor='bg-red-700'
                    bgColorHover='bg-red-800'
                    icon='fa-file-pdf'
                    text='Crear pdf'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
