import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET() {
    const serializedCookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0), 
        path: '/',
    });

    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
}
