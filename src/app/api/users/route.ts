import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';

export async function GET(req: NextRequest) {
    const cookies = req.cookies.get('token');
    const token   = cookies?.value;

    try {
        const inventoryResponse = await fetch(API_ROUTES.USER_DATA, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!inventoryResponse.ok) {
            const errorData = await inventoryResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: inventoryResponse.status });
        }

        const data = await inventoryResponse.json();

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}