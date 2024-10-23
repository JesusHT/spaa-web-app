import React, { useState } from 'react';

import ViewButton from '../buttons/ViewButton';
import UpdateButton from '../buttons/UpdateButton';
import DeleteButton from '../buttons/DeleteButton';
import Modal from '../modal/modal';
import { User } from '@/app/models/UserModel';


type UsersTableProps = {
  usersData: User[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const usersTable: React.FC<UsersTableProps> = ({ usersData, onView, onEdit, onDelete }) => {
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

  if (!usersData) return null;

  return (
    <div>
      <table className="min-w-full bg-white border mt-5 text-black border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-6 text-left text-gray-600">ID</th>
            <th className="py-3 px-6 text-left text-gray-600">Nombre</th>
            <th className="py-3 px-6 text-left text-gray-600">Email</th>
            <th className="py-3 px-6 text-left text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((item) => (
            <tr key={item.id_users} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">{item.id_users}</td>
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">{item.email}</td>
              <td className="py-3 px-6 flex space-x-2">
                <ViewButton onClick={() => onView(item.id_users)} />
                <UpdateButton onClick={() => onEdit(item.id_users)} />
                <DeleteButton onClick={() => handleDeleteClick(item.id_users)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        id_item={selectedItem ?? 0}
        type="users item"
        onConfirm={handleConfirmDelete}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default usersTable;
