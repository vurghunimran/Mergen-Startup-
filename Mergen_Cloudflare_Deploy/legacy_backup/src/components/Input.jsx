import React from 'react';
import '../styles/components/Input.css';

export const Input = ({
    label,
    error,
    fullWidth = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full' : ''} ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <input
                className={`input-field ${error ? 'input-field--error' : ''}`}
                {...props}
            />
            {error && <span className="input-error">{error}</span>}
        </div>
    );
};

export const Select = ({
    label,
    error,
    options = [],
    fullWidth = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full' : ''} ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <select className={`input-field ${error ? 'input-field--error' : ''}`} {...props}>
                <option value="" disabled>Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <span className="input-error">{error}</span>}
        </div>
    )
}
