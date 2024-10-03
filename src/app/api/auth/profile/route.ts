import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const URL_API_USER_AUTH = "http://localhost:4000/protected-route";
    const URL_API_USER_DATA = "http://localhost:4000/api/usuarios/"
    const cookies = req.cookies.get('token');
    const token   = cookies?.value;

    try {
        const authResponse = await fetch(URL_API_USER_AUTH, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!authResponse.ok) {
            const errorData = await authResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: authResponse.status });
        }

        const res = await authResponse.json();
        const authData = res.message;

        const id_auth = authData.id_auth; 

        const userResponse = await fetch(`${URL_API_USER_DATA}${id_auth}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!userResponse.ok) {
            const errorData = await userResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: userResponse.status });
        }

        const userData = await userResponse.json();

        const combinedData = {
            auth: authData, 
            user: userData.body[0],
        };

        return NextResponse.json(combinedData, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}