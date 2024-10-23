import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: number }}) {
    const URL_API_MODULES = "http://localhost:4000/api/laboratorios/";
    const cookies = req.cookies.get('token');
    const token = cookies?.value;
    const id_modules = params.id;

    try {
        const modulesResponse = await fetch(`${URL_API_MODULES}${id_modules}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!modulesResponse.ok) {
            const errorData = await modulesResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: modulesResponse.status });
        }

        const modulesData = await modulesResponse.json();

        return NextResponse.json(modulesData, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}