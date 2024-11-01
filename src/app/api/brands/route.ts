import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';

export async function GET(req: NextRequest) {
    const cookies = req.cookies.get('token');
    const token = cookies?.value;

    try {
        const brandsResponse = await fetch(API_ROUTES.BRANDS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!brandsResponse.ok) {
            const errorData = await brandsResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: brandsResponse.status });
        }

        const brandsData = await brandsResponse.json();

        return NextResponse.json(brandsData, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}