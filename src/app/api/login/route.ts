import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    const { worker_number, password } = await req.json();
    const URL_API_LOGIN = "http://localhost:4000/api/auth/login";

    try {
        const externalApiResponse = await fetch(URL_API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ worker_number, password }),
            credentials: 'include',
        });

        if (!externalApiResponse.ok) {
            const errorData = await externalApiResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: externalApiResponse.status });
        }

        const data = await externalApiResponse.json();
        const token = data.body;

        const serializedCookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 día en segundos
            path: '/',
        });

        const response = NextResponse.json(data, { status: 200 });
        response.headers.set('Set-Cookie', serializedCookie);

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}
