import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';

export async function POST(req: NextRequest) {
    const {
        name,
        id_role,
        id_modules,
        worker_number,
        password,
        email,
        status,
        deleteP, 
        edit,   
        lends,
    } = await req.json();

    const cookies = req.cookies.get('token');
    const token = cookies?.value;

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    try {
        const externalApiResponse = await fetch(API_ROUTES.USER_DATA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                id_role,
                id_modules,
                worker_number,
                password,
                email,
                status,
                deleteP, 
                edit,   
                lends,
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
