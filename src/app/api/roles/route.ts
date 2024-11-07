import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';

export async function GET(req: NextRequest) {
    const cookies = req.cookies.get('token');
    const token = cookies?.value;

    try {
        const modelResponse = await fetch(API_ROUTES.ROLES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!modelResponse.ok) {
            const errorData = await modelResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: modelResponse.status });
        }

        const modelData = await modelResponse.json();

        return NextResponse.json(modelData, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}