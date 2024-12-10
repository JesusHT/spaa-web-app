'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import LeftArrowButton  from '@/app/components/buttons/LeftArrowButton';
import { useProfile }   from '@/app/context/profileContext';
import UseBorrowDetails from '@/app/hooks/useBorrowDetails';
import { BorrowModel }  from '@/app/models/BorrowModel';
import { BorrowObjectModel } from '@/app/models/BorrowObjectModel';
import Modal from '@/app/components/modal/modal';
import Button from '@/app/components/buttons/Button';

const InventoryView = () => {
  const { fetchBorrowById, fetchDetailsBorrowById, handleConfirmDelete, closeModal, isModalOpen, handleDeleteClick} = UseBorrowDetails();
  const [Borrow, setBorrow] = useState<BorrowModel | null>(null);
  const [BorrowDetails, setBorrowDetails] = useState<BorrowObjectModel | null>(null);
  const router = useRouter();
  const { profile } = useProfile();
  const idModule = Number(profile?.user.id_modules);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data    = await fetchBorrowById(Number(id))
        const details = await fetchDetailsBorrowById(Number(id))
        setBorrow(data)
        setBorrowDetails(details) 
      }
    };
    getData();
  }, [id]);

  function backPage(){
    router.push('/historial');
  }

  return (
    <>
        <div className="flex-grow p-6">
            <h1 className="text-2xl font-bold mb-4 p-2"> <LeftArrowButton onClick={backPage} /> Historial de prestamos - Ver prestamo ID {Borrow?.id_borrow}</h1>

            <div className='md:w-2/3 md:pl-6'>
                <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
                    <div>
                        <dt className="font-semibold">ID prestamo: </dt>
                        <dd className="mt-1">{Borrow?.id_borrow}</dd>
                    </div> 
                    <div>
                        <dt className="font-semibold">Fecha del prestamo: </dt>
                        <dd className="mt-1">{Borrow?.date_start.split('T')[0]}</dd>
                    </div> 
                    <div>
                        <dt className="font-semibold">Nombre del alumno: </dt>
                        <dd className="mt-1">{Borrow?.applicant}</dd>
                    </div> 
                    <div>
                        <dt className="font-semibold">Número de cuenta: </dt>
                        <dd className="mt-1">{Borrow?.num_account}</dd>
                    </div> 
                    <div>
                        <dt className="font-semibold">Grado y Grupo: </dt>
                        <dd className="mt-1">{Borrow?.semester}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Carrera: </dt>
                        <dd className="mt-1">{BorrowDetails?.[0]?.career_name}</dd>
                    </div> 
                    <div>
                        <dt className="font-semibold">Correo: </dt>
                        <dd className="mt-1">{Borrow?.email}</dd>
                    </div>   
                    <div>
                        <dt className="font-semibold">Nombre de la practica: </dt>
                        <dd className="mt-1">{Borrow?.practice_name}</dd>
                    </div>  
                    <div>
                        <dt className="font-semibold">Nombre del docente: </dt>
                        <dd className="mt-1">{Borrow?.teacher}</dd>
                    </div>
                    <div>
                        <dt className="font-semibold">Estado: </dt>
                        <dd className="mt-1">
                            {Borrow?.status === 1 ? (
                                <>
                                    <span className="text-green-600 font-bold">Activo </span><br></br>
                                    <Button
                                        onClick={() => handleDeleteClick(Number(Borrow?.id_borrow), Number(Borrow?.id_borrow))}
                                        textColor='white'
                                        bgColor='bg-red-700'
                                        bgColorHover='bg-red-800'
                                        icon='fa-check'
                                        text='Terminar prestamo'
                                    />
                                </>
                            ) : (
                                <span className="text-gray-500">Entregado</span>
                            )}
                        </dd>
                    </div>    
                </dl>
            </div>

            
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Lista de Artículos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                    {BorrowDetails?.map((detail, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                            <h3 className="text-lg font-semibold">{detail.name}</h3>
                            <p className="text-sm text-black">{detail.brand_name} - {detail.model_name}</p>
                            <p className="text-sm text-black mt-2">{detail.description}</p>
                            <div className="mt-4">
                                <div>
                                    <span className="font-semibold">Folio:</span> {detail.folio}
                                </div>
                                <div>
                                    <span className="font-semibold">Cantidad prestada:</span> {detail.quantity_borrowed}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <Modal
             id_item={Number(Borrow?.id_borrow)}
             type="prestamo"
             onConfirm={handleConfirmDelete}
             isOpen={isModalOpen}
             onClose={closeModal}
             customText='¿Estás seguro de que deseas finalizar el préstamo y entregar los artículos? Asegúrate de recibir todos los artículos correctamente antes de confirmar.'
        />
    </>
  );
};

export default InventoryView;