'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useDashboard from '@/app/hooks/useInventory';

import { InventoryItemDetails } from '@/app/models/InventoryDetailsModel';

import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';
import { useProfile } from '@/app/context/profileContext';

const InventoryView = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const [data, setData] = useState<InventoryItemDetails | null>(null);
  const idModule = Number(profile?.user.id_modules);
  const { id } = useParams();
  const { fetchInventoryDetailsById } = useDashboard(idModule);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const fetchedData = await fetchInventoryDetailsById(Number(id));

        setData(fetchedData);
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
        <h1 className="text-2xl font-bold mb-4 p-2"> <LeftArrowButton onClick={backPage} /> Gestión de Inventario - Ver articulo con folio {data?.folio}</h1>
        
        <div className="md:w-2/3 md:pl-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <dt className="font-semibold">Nombre:</dt>
                <dd className="mt-1">{data?.name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Descripción:</dt>
                <dd className="mt-1">{data?.description}</dd>
              </div>
              <div>
                <dt className="font-semibold">Folio:</dt>
                <dd className="mt-1">{data?.folio}</dd>
              </div>
              <div>
                <dt className="font-semibold">Marca:</dt>
                <dd className="mt-1">{data?.brand_name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Modelo:</dt>
                <dd className="mt-1">{data?.model_name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Módulo:</dt>
                <dd className="mt-1">{data?.module_name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Serie:</dt>
                <dd className="mt-1">{data?.serie}</dd>
              </div>
              <div>
                <dt className="font-semibold">Cantidad:</dt>
                <dd className="mt-1">{data?.quantity}</dd>
              </div>
              <div>
                <dt className="font-semibold">Estado:</dt>
                <dd className="mt-1">{data?.status === 1 ? 'Activo' : 'Inactivo'}</dd>
              </div>
              {data?.not_located && (
                <div>
                  <dt className="font-semibold">No Localizado:</dt>
                  <dd className="mt-1">{data?.not_located}</dd>
                </div>
              )}
              {data?.second_custodian && (
                <div>
                  <dt className="font-semibold">Segundo Custodio:</dt>
                  <dd className="mt-1">{data?.second_custodian}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
    </>
  );
};

export default InventoryView;