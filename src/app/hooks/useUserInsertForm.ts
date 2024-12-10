'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useUserInsertForm = (id_modules: number) => {
    const [name, setName] = useState<string>('');
    const [idRole, setIdRole] = useState<number>(0);
    const [workerNumber, setWorkerNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<number>(1);
    const [deletePermission, setDeletePermission] = useState<number | null>(idRole === 3 ? 0 : 0);
    const [editPermission, setEditPermission] = useState<number | null>(idRole === 3 ? 0 : 0);
    const [lendsPermission, setLendsPermission] = useState<number | null>(idRole === 3 ? 0 : 0);
    const [error, setError] = useState<string>('');
    const [errorPass, setErrorPass] = useState<{ message: string; color: string }[]>([]);
    const [errorPassConfirm, setErrorPassConfirm] = useState<{ message: string; color: string }[]>([]);
    const router = useRouter();

    const ValidatePass = (value: string) => {
        const validations = [
            { regex: /^.{8,}$/,    message: 'La contraseña debe tener al menos 8 caracteres.' },
            { regex: /\d/,       message: 'La contraseña debe contener al menos un número.' },
            { regex: /[A-Z]/,    message: 'La contraseña debe contener al menos una letra mayúscula.' },
            { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'La contraseña debe contener al menos un carácter especial.' },
        ];
        
        const messages = validations.map(({ regex, message }) => {
            const isValid = regex.test(value);
            return {
                message: `• ${message}`,
                color: isValid ? 'text-green-700' : 'text-red-700',
            };
        });

        if ((password && passwordConfirm) && password === passwordConfirm) {
            resetErrors();
        }

        const isValid = messages.every(msg => msg.color === 'text-green-700');
        return { isValid, messages };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !workerNumber || !email || !password) {
            setError('Por favor, completa todos los campos antes de continuar.');
            return;
        }

        if (password !== passwordConfirm) {
            let message = [{message:'Por favor, asegúrate de que ambas contraseñas sean iguales.', color: 'text-red-700'}]
            setErrorPass(message);
            setErrorPassConfirm(message);
            setError('Las contraseñas no coinciden.');
            return;
        }

        resetErrors();

        const formData = {
            id_role: idRole,
            name,
            id_modules,
            worker_number: workerNumber,
            password,
            email,
            status,
            deleteP: `${deletePermission}`,
            edit: `${editPermission}`,
            lends: `${lendsPermission}`,
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

        console.log(formData);
    };

    useEffect(() => {
        if (password) {
            const { isValid, messages } = ValidatePass(password);
            setErrorPass(isValid ? [] : messages);
        }
    }, [password]);

    useEffect(() => {
        if (passwordConfirm) {
            const { isValid, messages } = ValidatePass(passwordConfirm);
            setErrorPassConfirm(isValid ? [] : messages);
        }
    }, [passwordConfirm]);

    const ValidatePassword = (value: string) => {
        setPassword(value.replace(/\s+/g, ''));
    };

    const ValidatePasswordConfirm = (value: string) => {
        setPasswordConfirm(value.replace(/\s+/g, ''));
    };

    const resetErrors = () => {
        setErrorPass([]);
        setErrorPassConfirm([]);
        setError('');
    }

    return {
        name,
        setName,
        idRole,
        setIdRole,
        workerNumber,
        setWorkerNumber,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
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
        errorPass,
        errorPassConfirm,
        ValidatePassword,
        ValidatePasswordConfirm,
        handleSubmit,
    };
};

export default useUserInsertForm;
