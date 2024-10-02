import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const URL_API_USER = "http://localhost:4000/protected-route";

    try {
        const externalApiResponse = await fetch(URL_API_USER, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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