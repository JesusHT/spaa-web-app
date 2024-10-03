'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useLogout = () => {
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/');
            } else {
                const data = await response.json();
                setError(data.error || 'Ocurrió un error');
            }
        } catch (err) {
            setError('Ocurrió un error');
        }
    };
    
    return {
        handleSubmit,
    };
}

export default useLogout;