'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import useModel from '@/app/hooks/useModel';
import useBrands from '@/app/hooks/useBrands';
import useModules from '@/app/hooks/useModules';
import useDashboard from '@/app/hooks/useInventory';

import { InventoryItem } from '@/app/models/InventoryItem';
import { Brands } from '@/app/models/BrandModel';
import { Model } from '@/app/models/ModelsModel';
import { Modules } from '@/app/models/ModulesModel';

import LeftArrowButton from '@/app/components/buttons/LeftArrowButton';

const InventoryView = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState<InventoryItem | null>(null);
  const [brand, setBrand] = useState<Brands | null>(null);
  const [model, setModel] = useState<Model | null>(null);
  const [modules, setModules] = useState<Modules | null>(null);
  const { fetchModelById } = useModel(); 
  const { fetchBrandsById } = useBrands();
  const { fetchModulesById } = useModules();
  const { fetchInventoryById } = useDashboard();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const fetchedData    = await fetchInventoryById(Number(id));
        const fetchedBrand   = await fetchBrandsById(fetchedData.id_brand);
        const fetchedModel   = await fetchModelById(fetchedData.id_model);
        const fetchedModules = await fetchModulesById(fetchedData.id_module);

        setBrand(fetchedBrand);
        setModel(fetchedModel);
        setData(fetchedData);
        setModules(fetchedModules);
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
                <dd className="mt-1">{brand?.name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Modelo:</dt>
                <dd className="mt-1">{model?.name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Módulo:</dt>
                <dd className="mt-1">{modules?.name}</dd>
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
                <dd className="mt-1">{data?.status}</dd>
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
