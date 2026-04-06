import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[#2c3e50] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27ae60] focus:border-transparent transition-all duration-200 ${
            error ? 'border-[#c0392b]' : 'border-gray-300'
          } ${icon ? 'pl-12' : ''} ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#c0392b]">{error}</p>
      )}
    </div>
  );
};
