export interface InventoryItemDetails {
    id_inventory: number;
    id_brand: number;
    id_model: number;
    id_module: number;
    name: string;
    quantity: number;
    folio: number;
    description: string;
    serie: string;
    not_located: string | null;
    second_custodian: string | null;
    image_url: string;
    status: number;
    stock: number;
    brand_name: string;
    model_name: string;
    module_name: string;
}