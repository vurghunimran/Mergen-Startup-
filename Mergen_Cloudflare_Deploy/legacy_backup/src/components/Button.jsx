import React from 'react';
import '../styles/components/Button.css';

export const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    className = '',
    ...props
}) => {
    return (
        <button
            className={`btn btn--${variant} btn--${size} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
