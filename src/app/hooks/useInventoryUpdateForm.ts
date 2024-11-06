'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useInventoryUpdateForm = (id_module: number) => {
    const [id_inventory, setIdInventory] = useState<Number>(0);
    const [name, setName] = useState<string>('');
    const [idBrand, setIdBrand] = useState<string>('');
    const [idModel, setIdModel] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [folio, setFolio] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [serie, setSerie] = useState<string>('');
    const [notLocated, setNotLocated] = useState<number>(0);
    const [secondCustodian, setSecondCustodian] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [status, setStatus] = useState<number>(1); 
    const [brandName, setBrandName] = useState<string>(''); 
    const [modelName, setModelName] = useState<string>(''); 
    const [showBrandField, setShowBrandField] = useState<boolean>(false); 
    const [showModelField, setShowModelField] = useState<boolean>(false); 
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (idBrand === '0' && !brandName) {
            setError('Brand name is required when selecting "Other"');
            return;
        }

        if (idModel === '0' && !modelName) {
            setError('Model name is required when selecting "Other"');
            return;
        }

        if (id_inventory === 0 && !id_inventory) {
            setError('Id_inventory is requiered!!');
            return;
        }

        const formData = {
            id_inventory: id_inventory,
            id_brand: idBrand === '0' ? 0 : idBrand,
            id_model: idModel === '0' ? 0 : idModel,
            brand_name: idBrand === '0' ? brandName : undefined, 
            model_name: idModel === '0' ? modelName : undefined,
            id_module,
            name,
            quantity,
            folio,
            description,
            serie,
            not_located: notLocated,
            second_custodian: secondCustodian,
            image_url: imageUrl,
            status,
        };

        try {
            const response = await fetch('/api/inventory/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                sessionStorage.setItem('updateSuccess', 'true');
                router.push('/inventario');
            } else {
                const data = await response.json();
                setError(data.error || 'An error occurred');
            }
        } catch (err) {
            setError('An error occurred during insertion');
        }
    };

    return {
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
        notLocated,
        setNotLocated,
        secondCustodian,
        setSecondCustodian,
        imageUrl,
        setImageUrl,
        status,
        setStatus,
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
    };
};

export default useInventoryUpdateForm;
