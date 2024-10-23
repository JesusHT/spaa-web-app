'use client'

import { useRouter } from 'next/navigation';

const useLogout = () => {
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
            } 
        } catch (err) {
          console.error(err)
        }
    };
    
    return {
        handleSubmit,
    };
}

export default useLogout;