import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const cookies = req.cookies.get('token');
    const token = cookies?.value;
    const id_borrow = params.id;

    try {
        const borrowResponse = await fetch(`${API_ROUTES.BORROW}${id_borrow}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!borrowResponse.ok) {
            const errorData = await borrowResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: borrowResponse.status });
        }

        const data = await borrowResponse.json();

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}