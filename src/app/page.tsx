'use client';

import React from 'react';

import Image from 'next/image';
import useLoginForm from './hooks/useLoginForm'; 

// Assets
import Logo from '../public/assets/Logo.png';
import LoginSplash from '../public/assets/loginSplash.png';

const Login: React.FC = () => {
    const {
        workerNumber,
        setWorkerNumber,
        password,
        setPassword,
        error,
        handleSubmit,
        isPasswordVisible,
        togglePasswordVisibility,
    } = useLoginForm();

    return (
        <div className="bg-green-50 flex items-center justify-center h-screen">
            <div className="flex bg-green-300 rounded-lg shadow-lg text-black" style={{ maxWidth: '1200px', width: '100%' }}>
                <div className="w-1/2">
                    <Image 
                        src={LoginSplash} 
                        alt="Splash" 
                        className="w-full h-full object-cover rounded-l-lg" 
                        layout="responsive"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div className="w-1/2 bg-white p-8 rounded-r-lg flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <Image 
                            src={Logo} 
                            alt="Logo" 
                            width={64}
                            height={64}
                            priority
                        />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Inicio de Sesión</h2>
                    {error && (
                        <div className="w-full mb-4">
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                {error}
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="w-64">
                        <div className="mb-4">
                            <input
                                type="number"
                                id="worker_number"
                                name="worker_number"
                                placeholder="No. Trabajador"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={workerNumber}
                                onChange={(e) => setWorkerNumber(e.target.value)}
                                minLength={8}
                                maxLength={8}
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="absolute right-2 top-2 cursor-pointer"
                                id="eye"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? '👁️' : '👁️'}
                            </span>
                        </div>
                        <div className="mb-2 text-center">
                            <a href="/recuperar" className="text-sm text-green-600">¿Olvidaste la Contraseña?</a>
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
