"use client";

import React, { useEffect } from 'react';
import useUserInsertForm from "@/app/hooks/useUserInsertForm";
import MessageError from "@/app/components/message/error";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import BaseSwitch from "@/app/components/inputs/baseswitch";
import BaseInput from "@/app/components/inputs/baseInput";
import useRoles from '@/app/hooks/useRoles';

interface UserFormProps {
  idModules: number;
  roleID: number;
}

const UserForm: React.FC<UserFormProps> = ({ idModules, roleID }) => {
  const {
    name,
    setName,
    workerNumber,
    setWorkerNumber,
    password,
    setPassword,
    email,
    setEmail,
    idRole: selectedRole,
    setIdRole,
    deletePermission,
    setDeletePermission,
    editPermission,
    setEditPermission,
    lendsPermission,
    setLendsPermission,
    error,
    handleSubmit,
  } = useUserInsertForm(idModules);

  const { roles } = useRoles();
  const filteredRoles = roles?.filter(role => role.id >= roleID) || [];

  useEffect(() => {
    if (typeof roleID === 'number' && !isNaN(roleID)) {
      setIdRole(roleID);
    } else {
      setIdRole(0); 
    }
  }, [roleID, setIdRole]);
  

  return (
    <div className="flex justify-center">
      {error && <MessageError error={error} />}
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-7 w-1/3 rounded-md">
        <input type="hidden" id="id_modules" name="id_modules" value={idModules} required />
        <input type="hidden" id="status" name="status" value={1} required />

        {/* Campos de entrada */}
        <BaseInput
          id="name"
          name="name"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <BaseInput
          id="worker_number"
          name="worker_number"
          type="number"
          placeholder="Número de trabajador"
          value={workerNumber}
          onChange={(e) => setWorkerNumber(e.target.value)}
          required
        />

        <BaseInput
          id="email"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <BaseInput
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Selector de roles */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Seleccionar rol</label>
          <select
            id="role"
            name="role"
            value={selectedRole}
            onChange={(e) => setIdRole(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {filteredRoles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar permisos solo si el rol es igual a 3 */}
        {selectedRole === 3 && (
          <>
            <BaseSwitch
              id="delete"
              name="delete"
              checked={deletePermission === 1}
              onChange={(e) => setDeletePermission(e.target.checked ? 1 : 0)}
              label="Eliminar productos"
            />

            <BaseSwitch
              id="edit"
              name="edit"
              checked={editPermission === 1}
              onChange={(e) => setEditPermission(e.target.checked ? 1 : 0)}
              label="Modificar productos"
            />

            <BaseSwitch
              id="lends"
              name="lends"
              checked={lendsPermission === 1}
              onChange={(e) => setLendsPermission(e.target.checked ? 1 : 0)}
              label="Gestionar préstamos"
            />
          </>
        )}

        <SubmitButton name="usuario" />
      </form>
    </div>
  );
};

export default UserForm;
