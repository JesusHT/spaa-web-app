import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const {
        id_brand,
        id_model,
        name,
        quantity,
        folio,
        description,
        serie,
        image_url,
        status,
        not_located,
        second_custodian,  
        id_module,
        model_name,
        brand_name          
    } = await req.json();

    const URL_API_INVENTARIO = "http://localhost:4000/api/inventario/";

    const cookies = req.cookies.get('token');
    const token = cookies?.value;
    console.log(model_name)

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    try {
        const externalApiResponse = await fetch(URL_API_INVENTARIO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_brand,
                id_model,
                name,
                quantity,
                folio,
                description,
                serie,
                image_url,
                status,
                not_located,          
                second_custodian,
                id_module,
                model_name, 
                brand_name       
            }),
            credentials: 'include',
        });

        if (!externalApiResponse.ok) {
            const errorData = await externalApiResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: externalApiResponse.status });
        }

        const data = await externalApiResponse.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}
