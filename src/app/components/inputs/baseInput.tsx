interface BaseInputProps {
    id: string;
    name: string;
    type: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const BaseInput: React.FC<BaseInputProps> = ({ id, name, type, placeholder, value, onChange, required }) => {
    return (
        <div className="mb-4">
            <label htmlFor="quantity" className="block text-black">{placeholder}</label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded "
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default BaseInput;