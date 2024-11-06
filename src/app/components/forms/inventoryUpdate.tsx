"use client";

import React, { useEffect } from 'react';

import useInventoryUpdateForm from '@/app/hooks/useInventoryUpdateForm';
import useBrands from "@/app/hooks/useBrands";
import useModel from "@/app/hooks/useModel";

import MessageError from "@/app/components/message/error";
import BaseInput from "@/app/components/inputs/baseInput";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import InputSelect from "@/app/components/inputs/selectInput";
import { InventoryItem } from '@/app/models/InventoryItem';

interface InventoryFormProps {
    idModule: number | 0;
    inventoryItem?: InventoryItem | null; 
  }
  
  const InventoryForm: React.FC<InventoryFormProps> = ({ idModule, inventoryItem }) => {
    const {
      id_inventory,
      setIdInventory,
      name,
      setName,
      idBrand,
      setIdBrand,
      idModel,
      setIdModel,
      quantity,
      setQuantity,
      folio,
      setFolio,
      description,
      setDescription,
      serie,
      setSerie,
      imageUrl,
      setImageUrl,
      brandName,
      setBrandName,
      modelName,
      setModelName,
      showBrandField,
      setShowBrandField,
      showModelField,
      setShowModelField,
      error,
      handleSubmit,
    } = useInventoryUpdateForm(idModule);
  
    const { brands, loadingBrands, error: brandsError } = useBrands();
    const { models, loadingModel, error: modelError } = useModel();
  
    useEffect(() => {
      if (inventoryItem) {
        setIdInventory(inventoryItem.id_inventory);
        setName(inventoryItem.name);
        setIdBrand(inventoryItem.id_brand.toString());
        setIdModel(inventoryItem.id_model.toString());
        setQuantity(inventoryItem.quantity);
        setFolio(inventoryItem.folio);
        setDescription(inventoryItem.description);
        setSerie(inventoryItem.serie);
        setImageUrl(inventoryItem.image_url);
        setBrandName(inventoryItem.id_brand ? brands.find(b => b.id === inventoryItem.id_brand)?.name || '' : '');
        setModelName(inventoryItem.id_model ? models.find(m => m.id === inventoryItem.id_model)?.name || '' : '');
      }
    }, [inventoryItem, brands, models, setName, setIdBrand, setIdModel, setQuantity, setFolio, setDescription, setSerie, setImageUrl, setBrandName, setModelName, setIdInventory]);
  
    return (
      <div className='flex justify-center'>
          {error && <MessageError error={error} />}
  
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-7 w-1/3 rounded-md">
                  <input type="hidden" id="id_inventory" name='id_inventory' value={id_inventory} required/>
                  <input type="hidden" id="second_custodian" name="second_custodian" value="null" required/>
                  <input type="hidden" id="not_located" name="not_located" value="null" required/>
                  <input type="hidden" id="status" name="status" value="1" required />
                  <input type="hidden" id="id_module" name="id_module" value={idModule} /> 
  
                  <BaseInput
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nombre del Artículo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
  
                  <InputSelect
                      name="brand"
                      idValue={idBrand}
                      setIdValue={setIdBrand}
                      showInputField={showBrandField}
                      setShowInputField={setShowBrandField}
                      inputValue={brandName}
                      setInputValue={setBrandName}
                      options={brands}
                      inputPlaceholder="Nombre de la Nueva Marca"
                      selectLabel="Seleccionar Marca"
                  />
  
                  <InputSelect
                      name="model"
                      idValue={idModel}
                      setIdValue={setIdModel}
                      showInputField={showModelField}
                      setShowInputField={setShowModelField}
                      inputValue={modelName}
                      setInputValue={setModelName}
                      options={models}
                      inputPlaceholder="Nombre del Nuevo Modelo"
                      selectLabel="Seleccionar Modelo"
                  />
  
                  <BaseInput
                      id="folio"
                      name="folio"
                      type="number"
                      placeholder="Folio"
                      value={folio}
                      onChange={(e) => setFolio(Number(e.target.value))}
                      required
                  />
  
                  <BaseInput
                      id="serie"
                      name="serie"
                      type="text"
                      placeholder="Número de Serie"
                      value={serie}
                      onChange={(e) => setSerie(e.target.value)}
                  />
  
                  <BaseInput
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="Cantidad"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      required
                  />
  
                  <BaseInput
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Descripción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
  
                  <BaseInput
                      id="image_url"
                      name="image_url"
                      type="string"
                      placeholder="URL de la Imagen"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                  />
  
                  <SubmitButton name="Inventario" />
          </form>
      </div>
    );
  };
  
  export default InventoryForm;
  