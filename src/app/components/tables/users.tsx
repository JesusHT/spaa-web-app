import React, { useState } from 'react';
import { Profile } from '@/app/models/ProfileModel';

import Button from '@/app/components/buttons/Button';
import Modal  from '@/app/components/modal/modal';

type UsersTableProps = {
    usersData: Profile[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

const usersTable: React.FC<UsersTableProps> = ({ usersData, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen]    = useState(false);
    const [selectedItem, setSelectedItem]  = useState<number | null>(null);
    const [worker_number, setWorkerNumber] = useState<number | null>(null);
    const roles = ['wtf no hay un rol 0','Director', 'Laboratorista', 'Practicante'];

    const handleDeleteClick = (id: number, worker_number: number) => {
        setSelectedItem(id);
        setWorkerNumber(worker_number);
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
        <>
        <table className="min-w-full bg-white border mt-5 text-black border-gray-200 rounded-lg shadow-md">
            <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-6 text-left text-gray-600">Número de trabajador</th>
                    <th className="py-3 px-6 text-left text-gray-600">Role</th>
                    <th className="py-3 px-6 text-left text-gray-600">Nombre</th>
                    <th className="py-3 px-6 text-left text-gray-600">Email</th>
                    <th className="py-3 px-6 text-left text-gray-600">Acciones</th>
                </tr>
            </thead>
            <tbody>
            {usersData.map((item) => (
                <tr key={item.user.id_users} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{item.auth.worker_number}</td>
                    <td className="py-3 px-6">{roles[item.auth.id_role]}</td>
                    <td className="py-3 px-6">{item.user.name}</td>
                    <td className="py-3 px-6">{item.user.email}</td>
                    <td className="py-3 px-6 flex space-x-2">
                        <Button 
                            onClick={() => onEdit(item.user.id_users)}
                            textColor='white'
                            bgColor='bg-yellow-400'
                            bgColorHover='bg-yellow-500'
                            icon='fa-pen-to-square'
                            text='Editar'
                        />
                        <Button 
                            onClick={() => handleDeleteClick(item.user.id_users, item.auth.worker_number)}
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
            type="usuario"
            onConfirm={handleConfirmDelete}
            isOpen={isModalOpen}
            onClose={closeModal}
            worker_number={Number(worker_number)}
        />
        </>
    );
};

export default usersTable;