'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useLoginForm = () => {
    const [workerNumber, setWorkerNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ worker_number: workerNumber, password: password }),
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/inventario');
            } else {
                const data = await response.json();
                setError(data.error || 'Ocurrió un error');
            }
        } catch (err) {
            setError('Ocurrió un error');
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return {
        workerNumber,
        setWorkerNumber,
        password,
        setPassword,
        error,
        handleSubmit,
        isPasswordVisible,
        togglePasswordVisibility,
    };
};

export default useLoginForm;