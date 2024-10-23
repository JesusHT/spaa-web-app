'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import FormInsert from '@/app/components/forms/inventory';
import { InventoryItem } from '@/app/models/InventoryItem';
import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';
import { fetchInventory } from '@/app/utils/fetchInventory';

const InventoryEdit = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<InventoryItem | null>(null);
  const idModule = 2;

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const fetchedData = await fetchInventory(Number(id));

        setData(fetchedData );
      }
    };
    getData();
  }, [id]);

  function backPage(){
    router.push('/inventario');
  }

  return (
    <>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4 p-2"> <LeftArrowButton onClick={backPage} /> Gestión de Inventario - Editar </h1>
        
      </div>
    </>
  );
};

export default InventoryEdit;
