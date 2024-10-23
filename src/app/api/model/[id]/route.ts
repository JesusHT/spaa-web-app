import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: number } })  {
    const URL_API_MODELS = "http://localhost:4000/api/modelos/";
    const cookies = req.cookies.get('token');
    const token = cookies?.value;
    const id_model = params.id;

    try {
        const modelResponse = await fetch(`${URL_API_MODELS}${id_model}`, {
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