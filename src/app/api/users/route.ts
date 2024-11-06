import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/app/api/config/routes';
import { User } from '@/app/models/UserModel';
import { Profile } from '@/app/models/ProfileModel';

export async function GET(req: NextRequest) {
    const cookies = req.cookies.get('token');
    const token = cookies?.value;

    try {
        const inventoryResponse = await fetch(API_ROUTES.USER_DATA, {
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

        const profiles: Profile[] = [];

        for (const user of data.body) {
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
                console.error(`Error fetching auth data for user ${user.id_users}:`, errorData);
                continue;
            }

            const authData = await authResponse.json();

            const profile: Profile = {
                auth: authData.body[0],
                user: user as User,
            };

            profiles.push(profile);
        }

        return NextResponse.json(profiles, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error connecting to the external API' }, { status: 500 });
    }
}
