import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const URL_API_BRANDS = "http://localhost:4000/api/marcas";
    const cookies = req.cookies.get('token');
    const token = cookies?.value;

    try {
        const brandsResponse = await fetch(URL_API_BRANDS, {
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