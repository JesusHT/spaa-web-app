'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useUserInsertForm = () => {
    const [name, setName] = useState<string>('');
    const [idRole, setIdRole] = useState<number>(0);
    const [idModules, setIdModules] = useState<string>('');
    const [workerNumber, setWorkerNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<number>(1);
    const [deletePermission, setDeletePermission] = useState<number | null>(idRole === 3 ? null : 0);
    const [editPermission, setEditPermission] = useState<number | null>(idRole === 3 ? null : 0);
    const [lendsPermission, setLendsPermission] = useState<number | null>(idRole === 3 ? null : 0);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !workerNumber || !email || !password) {
            setError('All fields are required');
            return;
        }

        const formData = {
            id_role: idRole,
            name,
            id_modules: idModules,
            worker_number: workerNumber,
            password,
            email,
            status,
            delete: deletePermission,
            edit: editPermission,
            lends: lendsPermission,
        };

        try {
            const response = await fetch('/api/users/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                sessionStorage.setItem('insertSuccess', 'true');
                router.push('/usuarios');
            } else {
                const data = await response.json();
                setError(data.error || 'An error occurred');
            }
        } catch (err) {
            setError('An error occurred during insertion');
        }
    };

    return {
        name,
        setName,
        idRole,
        setIdRole,
        idModules,
        setIdModules,
        workerNumber,
        setWorkerNumber,
        password,
        setPassword,
        email,
        setEmail,
        status,
        setStatus,
        deletePermission,
        setDeletePermission,
        editPermission,
        setEditPermission,
        lendsPermission,
        setLendsPermission,
        error,
        handleSubmit,
    };
};

export default useUserInsertForm;
