'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/app/context/profileContext';

import FormInsert from '@/app/components/forms/inventory';
import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';

const InventoryInsert = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const idModule = Number(profile?.user.id_modules);

  function backPage(){
    router.push('/inventario');
  }

  return (
    <>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold p-2"><LeftArrowButton onClick={() => backPage()}/> Gestión de Inventario - Agregar</h1>

        <FormInsert idModule={idModule}/>
      </div>
    </>
  );
};

export default InventoryInsert;
