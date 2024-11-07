'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useUserInsertForm = (id_modules: number) => {
    const [name, setName] = useState<string>('');
    const [idRole, setIdRole] = useState<number>(0);
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
            id_modules,
            worker_number: workerNumber,
            password,
            email,
            status,
            delete: deletePermission,
            edit: editPermission,
            lends: lendsPermission,
        };

        console.log(formData)
    };

    return {
        name,
        setName,
        idRole,
        setIdRole,
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
