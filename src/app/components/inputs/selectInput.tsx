import React from 'react';

interface InputSelectProps {
    name: string;
    idValue: string;
    setIdValue: (value: string) => void;
    showInputField: boolean;
    setShowInputField: (show: boolean) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    options: { id: number; name: string }[];
    inputPlaceholder: string;
    selectLabel: string;
    inputLabel?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
    name,
    idValue,
    setIdValue,
    showInputField,
    setShowInputField,
    inputValue,
    setInputValue,
    options,
    inputPlaceholder,
    selectLabel,
    inputLabel = `Nombre de ${name}`
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-black">{selectLabel}</label>
            <select
                id={name}
                name={name}
                className="w-full p-2 border border-gray-300 rounded"
                value={idValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setIdValue(value);
                    if (value === '0') setShowInputField(true);
                    else setShowInputField(false);
                }}
                required
            >
                <option value="" disabled>Seleccionar {name}</option>
                {options && options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
                <option value="0">Otro</option>
            </select>
            {showInputField && (
                <input
                    type="text"
                    id={`${name}_input`}
                    name={`${name}_input`}
                    placeholder={inputPlaceholder}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            )}
        </div>
    );
};

export default InputSelect;
