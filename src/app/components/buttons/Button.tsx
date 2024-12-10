'use client';

import clsx from 'clsx';

type ButtonProps = {
    onClick: () => void;
    icon?: string;
    text?: string;
    bgColor: string;
    bgColorHover: string;
    textColor: string;
    extraClass?: string;
};

const Button: React.FC<ButtonProps> = ({
    onClick,
    textColor,
    bgColor,
    bgColorHover,
    extraClass,
    text,
    icon,
  }) => {
    const classes = `px-4 py-2 text-sm font-medium rounded-lg ${bgColor} text-${textColor} hover:${bgColorHover} ${extraClass}`;

    return (
      <button
        onClick={onClick}
        className={clsx(classes)}
      >
        {icon && <i className={`fa-solid ${icon}`}></i>} {text}
      </button>
    );
  };
  

export default Button;
