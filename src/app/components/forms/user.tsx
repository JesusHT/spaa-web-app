"use client";

import React, { useState } from 'react';
import MessageError from "@/app/components/message/error";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import BaseSwitch from "@/app/components/inputs/baseswitch"; // Importa el componente BaseSwitch

interface UserFormProps {
  idModule: number;
}

const InventoryForm: React.FC<UserFormProps> = ({ idModule }) => {
  const [error, setError] = useState<string | null>(null);

  const [deletePermission, setDeletePermission] = useState<number>(0);
  const [editPermission, setEditPermission] = useState<number>(0);
  const [lendsPermission, setLendsPermission] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado");
    console.log("Permisos de eliminación:", deletePermission);
    console.log("Permisos de edición:", editPermission);
    console.log("Permisos de préstamos:", lendsPermission);
  };

  return (
    <div className='flex justify-center'>
        {error && <MessageError error={error} />}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-7 w-1/3 rounded-md">
            <input type="hidden" id='id_modules' name='id_modules' value={idModule} required/>
            <input type="hidden" id='status' name='status' value={1} required/>
            
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

            <SubmitButton name="Guardar cambios" />
        </form>
    </div>
  );
};

export default InventoryForm;
