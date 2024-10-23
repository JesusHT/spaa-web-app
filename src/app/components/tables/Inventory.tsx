import React, { useState } from 'react';

import ViewButton from '@/app/components/buttons/ViewButton';
import UpdateButton from '@/app/components/buttons/UpdateButton';
import DeleteButton from '@/app/components/buttons/DeleteButton';
import Modal from '@/app/components/modal/modal';
import { InventoryItem } from '@/app/models/InventoryItem';

type InventoryTableProps = {
  inventoryData: InventoryItem[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const InventoryTable: React.FC<InventoryTableProps> = ({ inventoryData, onView, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedItem(id);
    setIsModalOpen(true);
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
            <th className="py-3 px-6 text-left text-gray-600">ID</th>
            <th className="py-3 px-6 text-left text-gray-600">Nombre</th>
            <th className="py-3 px-6 text-left text-gray-600">Cantidad</th>
            <th className="py-3 px-6 text-left text-gray-600">Descripción</th>
            <th className="py-3 px-6 text-left text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id_inventory} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">{item.id_inventory}</td>
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">{item.quantity}</td>
              <td className="py-3 px-6">{item.description}</td>
              <td className="py-3 px-6 flex space-x-2">
                <ViewButton onClick={() => onView(item.id_inventory)} />
                <UpdateButton onClick={() => onEdit(item.id_inventory)} />
                <DeleteButton onClick={() => handleDeleteClick(item.id_inventory)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        id_item={selectedItem ?? 0}
        type="inventory item"
        onConfirm={handleConfirmDelete}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default InventoryTable;
