export interface BorrowObjectModel {
    id_borrowed_object: number;
    id_borrow: number;
    id_inventory: number;
    quantity: number;
    quantity_borrowed: number;
    id_brand: number;
    brand_name: string;
    id_model: number;
    model_name: string;
    id_module: number;
    module_name: string;
    name: string;
    description: string;
    serie: string;
    image_url: string;
    status: number;
    stock: number;
    not_located: string | null;
    second_custodian: string | null;
    career_name: string;
}
