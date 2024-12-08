import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';

export async function GET(req: NextRequest) {
    const cookies = req.cookies.get('token');
    const token   = cookies?.value;

    try {
        const response = await fetch(API_ROUTES.BORROW, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.body }, { status: response.status });
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}