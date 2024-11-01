import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';

export async function GET(req: NextRequest) {
    const cookies = req.cookies.get('token');
    const token = cookies?.value;

    try {
        const modulesResponse = await fetch(API_ROUTES.MODULES, {
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