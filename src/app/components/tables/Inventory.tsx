import React, { useState } from 'react';
import { InventoryItem } from '@/app/models/InventoryItem';

import Button from '@/app/components/buttons/Button';
import Modal from '@/app/components/modal/modal';

type InventoryTableProps = {
    inventoryData: InventoryItem[];
    onView:   (id: number) => void;
    onEdit:   (id: number) => void;
    onDelete: (id: number) => void;
};

const InventoryTable: React.FC<InventoryTableProps> = ({ inventoryData, onView, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen]   = useState(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [folio, setFolio]               = useState<number | null>(null);

    const handleDeleteClick = (id: number, folio: number) => {
        setSelectedItem(id);
        setIsModalOpen(true);
        setFolio(folio);
    };

    const handleConfirmDelete = (id: number) => {
        onDelete(id);
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!inventoryData) return null;

  return (
    <div>
      <table className="min-w-full bg-white border mt-5 text-black border-gray-200 rounded-lg shadow-md">
        <thead>
            <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left text-gray-600">Folio</th>
                <th className="py-3 px-6 text-left text-gray-600">Nombre</th>
                <th className="py-3 px-6 text-left text-gray-600">Cantidad</th>
                <th className="py-3 px-6 text-left text-gray-600">Descripción</th>
                <th className="py-3 px-6 text-left text-gray-600">Acciones</th>
            </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id_inventory} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{item.folio}</td>
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.quantity}</td>
                <td className="py-3 px-6">{item.description}</td>
                <td className="py-3 px-6 flex space-x-2">
                    <Button 
                        onClick={() => onView(item.id_inventory)}
                        textColor='white'
                        bgColor='bg-green-700'
                        bgColorHover='bg-green-800'
                        icon='fa-eye'
                        text='Ver'
                    />
                    <Button 
                        onClick={() => onEdit(item.id_inventory)}
                        textColor='white'
                        bgColor='bg-yellow-400'
                        bgColorHover='bg-yellow-500'
                        icon='fa-pen-to-square'
                        text='Editar'
                    />
                    <Button 
                        onClick={() => handleDeleteClick(item.id_inventory, item.folio)}
                        textColor='white'
                        bgColor='bg-red-700'
                        bgColorHover='bg-red-800'
                        icon='fa-trash'
                        text='Eliminar'
                    />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        id_item={selectedItem ?? 0}
        type="articulo"
        onConfirm={handleConfirmDelete}
        isOpen={isModalOpen}
        onClose={closeModal}
        folio={Number(folio)}
      />
    </div>
  );
};

export default InventoryTable;
