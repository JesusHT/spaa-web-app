'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProfile } from '@/app/context/profileContext';

import { InventoryItem } from '@/app/models/InventoryItem';
import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';
import useDashboard from '@/app/hooks/useInventory';
import InventoryForm from '@/app/components/forms/inventoryUpdate';

const InventoryEdit = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const { id } = useParams();
  const [data, setData] = useState<InventoryItem | null>(null);
  const idModule = profile?.user.id_modules || 0;
  const {fetchInventoryById} = useDashboard(idModule);

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
    router.push('/inventario');
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4 p-2"> <LeftArrowButton onClick={backPage} /> Gestión de Inventario - Editar articulo con folio {data?.folio}</h1>

        <InventoryForm idModule={idModule} inventoryItem={data}/>

      </div>
    </>
  );
};

export default InventoryEdit;
