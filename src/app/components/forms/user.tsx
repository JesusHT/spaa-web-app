'use client';

import React, { useEffect, useState } from 'react';
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
    passwordConfirm,
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
    errorPass,
    errorPassConfirm,
    ValidatePassword,
    ValidatePasswordConfirm,
    handleSubmit,
  } = useUserInsertForm(idModules);

  const { roles } = useRoles();
  const filteredRoles = roles?.filter(role => role.id >= roleID) || [];
  const [isVisible, setIsVisible] = useState(false);
  const [isPermissionConfirmed, setIsPermissionConfirmed] = useState(false);
  const [isVisibleButton, setIsVisibleButton] = useState(false);

  useEffect(() => {
    if (typeof roleID === 'number' && !isNaN(roleID)) {
      setIdRole(roleID);
    } else {
      setIdRole(0); 
    }
  }, [roleID, setIdRole]);

  useEffect(() => {
    selectedRole === 3 ? setIsVisibleButton(isPermissionConfirmed) : setIsVisibleButton(true); 
    
  }, [selectedRole, isPermissionConfirmed]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handlePermissionCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsPermissionConfirmed(checked);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-7 w-1/3 rounded-md min-w-[450px]">
        {error && <MessageError error={error} />}

        <input type="hidden" id="id_modules" name="id_modules" value={idModules.toString()} required />
        <input type="hidden" id="status" name="status" value={1} required />

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
          type={isVisible ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => ValidatePassword(e.target.value)}
          required
        />
        <label htmlFor="">
          {errorPass.map((item, index) => (
            <div key={index} className={item.color}>
              {item.message}
            </div>
          ))}
        </label>

        <BaseInput
          id="passwordConfirm"
          name="passwordConfirm"
          type={isVisible ? "text" : "password"}
          placeholder="Confirmar contraseña"
          value={passwordConfirm}
          onChange={(e) => ValidatePasswordConfirm(e.target.value)}
          required
        />
        <label htmlFor="">
          {errorPassConfirm.map((item, index) => (
            <div key={index} className={item.color}>
              {item.message}
            </div>
          ))}
        </label>

        <div className="flex justify-end">
          <label htmlFor="isVisible" className="mr-2">Mostrar contraseña</label>
          <input 
            type="checkbox"
            name="isVisible"
            id="isVisible"
            checked={isVisible}
            onChange={handleToggleVisibility}
          />
        </div>

        <div>
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

        {selectedRole === 3 && (
          <>
            <BaseSwitch
              id="delete"
              name="delete"
              checked={deletePermission === 1}
              onChange={(e) => setDeletePermission(e.target.checked ? 1 : 0)}
              label="Eliminar productos"
              infoText="El practicante podrá eliminar cualquier artículo que esté registrado."
            />

            <BaseSwitch
              id="edit"
              name="edit"
              checked={editPermission === 1}
              onChange={(e) => setEditPermission(e.target.checked ? 1 : 0)}
              label="Modificar productos"
              infoText="El practicante podrá editar cualquiera de los artículos que estén registrados."
            />

            <BaseSwitch
              id="lends"
              name="lends"
              checked={lendsPermission === 1}
              onChange={(e) => setLendsPermission(e.target.checked ? 1 : 0)}
              label="Gestionar préstamos"
              infoText="El practicante podrá acceder a la aplicación móvil y realizar préstamos a los alumnos."
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="confirmPermissions"
                checked={isPermissionConfirmed}
                onChange={handlePermissionCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="confirmPermissions" className="text-sm">
                Confirmo que entiendo los permisos que estoy dando al practicante.
              </label>
            </div>
          </>
        )}

        <SubmitButton name="usuario" isActive={isVisibleButton} />
      </form>
    </div>
  );
};

export default UserForm;
