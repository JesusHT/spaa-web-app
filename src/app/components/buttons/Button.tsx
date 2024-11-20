'use client';

type ButtonProps = {
    onClick: () => void; 
    icon?: string;
    text?: string;
    bgColor: string;
    bgColorHover: string;
    textColor: string;
    extraClass?: string;
  };
  
const Button: React.FC<ButtonProps> = ({ onClick, textColor, bgColor, bgColorHover, extraClass, text, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${bgColor} hover:${bgColorHover} text-${textColor} ${extraClass}`}
            >
            <i className={`fa-solid ${icon}`}></i> {text}
        </button>
    );
};
  
export default Button;