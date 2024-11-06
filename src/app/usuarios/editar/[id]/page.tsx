'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProfile } from '@/app/context/profileContext';

import { InventoryItem } from '@/app/models/InventoryItem';
import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';
import useDashboard from '@/app/hooks/useInventory';

const UserEdit = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const { id } = useParams();
  const [data, setData] = useState<InventoryItem | null>(null);
  const idModule = profile?.user.id_modules;
  const {fetchInventoryById} = useDashboard();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const fetchedData = await fetchInventoryById(Number(id));

        setData(fetchedData);
      }
    };
    getData();
  }, [id]);

  function backPage(){
    router.push('/usuarios');
  }

  return (
    <>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4 p-2"> <LeftArrowButton onClick={backPage} /> Gestión de Usuarios - Editar </h1>
        <h1>Modulo: {profile?.user.id_modules}</h1>
      </div>
    </>
  );
};

export default UserEdit;
