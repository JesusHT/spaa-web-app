'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { useProfile } from '@/app/context/profileContext';
import useUserUpdate from '@/app/hooks/useUserUpdate';

import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';
import BaseInput from '@/app/components/inputs/baseInput';
import BaseSwitch from '@/app/components/inputs/baseswitch';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import MessageError from '@/app/components/message/error';

const UserEdit = () => {
  const { fetchUserById } = useUserUpdate();
  const [user, setUser] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [workerNumber, setWorkerNumber] = useState(0);
  const [email, setEmail] = useState('');
  const [deletePermission, setDeletePermission] = useState(0);
  const [editPermission, setEditPermission] = useState(0);
  const [lendsPermission, setLendsPermission] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPracticante, setIsPracticante] = useState<boolean>(false);

  const router = useRouter();
  const { profile } = useProfile();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name,
      workerNumber,
      email,
      deletePermission,
      editPermission,
      lendsPermission,
    });
  };

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await fetchUserById(Number(id));
        if (data) {
          setUser(data);
          setWorkerNumber(Number(data.auth.worker_number) || 0);
          setEmail(data.user.email || '');
          setName(data.user.name || '');
          if (data.auth.id_role === 3) {

            setDeletePermission(Number(data.settings.delete) || 0);
            setEditPermission(Number(data.settings.edit) || 0);
            setLendsPermission(Number(data.settings.lends) || 0);
            setIsPracticante(true)
          }
        }
      }
    };
    getData();
  }, [id]);

  function backPage() {
    router.push('/usuarios');
  }

  return (
    <>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4 p-2">
          <LeftArrowButton onClick={backPage} /> Gestión de Usuarios - Editar{' '}
          {user?.auth.worker_number || ''}
        </h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-7 w-1/3 rounded-md min-w-[450px] rounded-md"
          >
            {error && <MessageError error={error} />}

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
              id="workerNumber"
              name="workerNumber"
              type="number"
              placeholder="Número de trabajador"
              value={workerNumber}
              onChange={(e) => setWorkerNumber(Number(e.target.value))}
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

            {isPracticante && (
              <>
                <BaseSwitch
                  id="deletePermission"
                  name="deletePermission"
                  checked={deletePermission === 1}
                  onChange={(e) =>
                    setDeletePermission(e.target.checked ? 1 : 0)
                  }
                  label="Permiso para eliminar"
                  infoText="El practicante podrá eliminar cualquier artículo que esté registrado."
                />

                <BaseSwitch
                  id="editPermission"
                  name="editPermission"
                  checked={editPermission === 1}
                  onChange={(e) => setEditPermission(e.target.checked ? 1 : 0)}
                  label="Permiso para editar"
                  infoText="El practicante podrá editar cualquiera de los artículos que estén registrados."
                />

                <BaseSwitch
                  id="lendsPermission"
                  name="lendsPermission"
                  checked={lendsPermission === 1}
                  onChange={(e) =>
                    setLendsPermission(e.target.checked ? 1 : 0)
                  }
                  label="Permiso para préstamos"
                  infoText="El practicante podrá acceder a la aplicación móvil y realizar préstamos a los alumnos."
                />
              </>
            )}

            <SubmitButton name=" cambios" />
          </form>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
