import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';
import { User } from '@/app/models/UserModel';
import { Profile, UserSettings } from '@/app/models/ProfileModel';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const cookies = req.cookies.get('token');
    const token = cookies?.value;
    const userId = params.id;

    if (!token) {
        return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    try {
        const inventoryResponse = await fetch(`${API_ROUTES.USER_DATA}${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!inventoryResponse.ok) {
            const errorData = await inventoryResponse.json();
            return NextResponse.json({ error: errorData.body }, { status: inventoryResponse.status });
        }

        const data = await inventoryResponse.json();

        if (!data.body || data.body.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user = data.body[0];

        const authResponse = await fetch(`${API_ROUTES.AUTH_DATA}${user.id_users}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (!authResponse.ok) {
            const errorData = await authResponse.json();
            return NextResponse.json({ error: `Error fetching auth data for user ${user.id_users}: ${errorData.body}` }, { status: authResponse.status });
        }

        const authData = await authResponse.json();
        
        let settingsData = null;


        if (authData.body[0].id_role === 3) {
            const settingsResponse = await fetch(`${API_ROUTES.SETTINGS}byuser/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });

            if (!settingsResponse.ok) {
                const errorData = await settingsResponse.json();
                return NextResponse.json({ error: `Error fetching settings: ${errorData.body}` }, { status: settingsResponse.status });
            }

            settingsData = await settingsResponse.json();

            console.log(`settings: ${settingsData}`)
        }

        const profile: Profile = {
            auth: authData.body[0],
            user: user as User,
            settings: settingsData ? settingsData.body[0] as UserSettings : undefined,
        };

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}
