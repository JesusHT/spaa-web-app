import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const {
        idBrand,
        idModel,
        name,
        quantity,
        folio,
        description,
        serie,
        imageUrl,
        status,
        notLocated,
        secondCustodian,  
        id_module          
    } = await req.json();

    const URL_API_INVENTARIO = "http://localhost:4000/api/inventario/";

    const cookies = req.cookies.get('token');
    const token = cookies?.value;

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
                id_brand: idBrand,
                id_model: idModel,
                name,
                quantity,
                folio,
                description,
                serie,
                image_url: imageUrl,
                status,
                not_located: notLocated,          
                second_custodian: secondCustodian,
                id_module                
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
