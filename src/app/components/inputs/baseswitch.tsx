import React from 'react';

interface BaseSwitchProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    infoText: string;
}

const BaseSwitch: React.FC<BaseSwitchProps> = ({ id, name, checked, onChange, label, infoText }) => {
    return (
        <div className="mb-4 flex items-center">
            <label htmlFor={id} className="mr-2 text-black cursor-pointer flex items-center">
                <span 
                    className="mr-1 cursor-help" 
                    title={infoText}
                >
                    <i className="fa-solid fa-circle-info text-yellow-500"></i>
                </span>
                {label}
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                <div
                    className={`block w-10 h-6 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
                ></div>
                <div
                    className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        checked ? 'transform translate-x-4' : ''
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default BaseSwitch;

