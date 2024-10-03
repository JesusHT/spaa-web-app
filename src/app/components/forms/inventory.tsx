'use client';

import useInventoryInsertForm from '../../hooks/useInventoryInsertForm'; 
import useBrands from '../../hooks/useBrands'; 
import useModel from '../../hooks/useModel'; 

interface InventoryFormProps {
    idModule: number;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ idModule }) => {
    const {
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
    } = useInventoryInsertForm(idModule);  

    const { brands, loadingBrands, error: brandsError } = useBrands(); 
    const { models, loadingModel, error: modelError } = useModel(); 

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Gestión de Inventario</h2>

                {error && (
                    <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <input type="hidden" id="second_custodian" name="second_custodian" value="null" required />
                    <input type="hidden" id="not_located" name="not_located" value="null" required />
                    <input type="hidden" id="status" name="status" value="1" required />
                    <input type="hidden" id="id_module" name="id_module" value={idModule} />

                    <div className="mb-4">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre del Artículo"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="id_brand" className="block text-white">Seleccionar Marca</label>
                        <select
                            id="id_brand"
                            name="id_brand"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={idBrand}
                            onChange={(e) => {
                                const value = e.target.value;
                                setIdBrand(value);
                                if (value === '0') setShowBrandField(true);
                                else setShowBrandField(false);
                            }}
                            required
                        >
                            <option value="" disabled>Seleccionar Marca</option>
                            {brands && brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                            <option value="0">Otro</option>
                        </select>
                        {showBrandField && (
                            <input
                                type="text"
                                id="brand_name"
                                name="brand_name"
                                placeholder="Nombre de la Nueva Marca"
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                            />
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="id_model" className="block text-white">Seleccionar Modelo</label>
                        <select
                            id="id_model"
                            name="id_model"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={idModel}
                            onChange={(e) => {
                                const value = e.target.value;
                                setIdModel(value);
                                if (value === '0') setShowModelField(true);
                                else setShowModelField(false);
                            }}
                            required
                        >
                            <option value="" disabled>Seleccionar Modelo</option>
                            {models && models.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                            <option value="0">Otro</option>
                        </select>
                        {showModelField && (
                            <input
                                type="text"
                                id="model_name"
                                name="model_name"
                                placeholder="Nombre del Nuevo Modelo"
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                            />
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-white">Cantidad</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Cantidad"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="folio" className="block text-white">Folio</label>
                        <input
                            type="number"
                            id="folio"
                            name="folio"
                            placeholder="Folio"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={folio}
                            onChange={(e) => setFolio(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Descripción"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            id="serie"
                            name="serie"
                            placeholder="Número de Serie"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="string"
                            id="image_url"
                            name="image_url"
                            placeholder="URL de la Imagen"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded"
                    >
                        Guardar Inventario
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InventoryForm;
