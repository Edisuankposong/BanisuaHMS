import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white border border-transparent focus:ring-primary-500',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white border border-transparent focus:ring-secondary-500',
    success: 'bg-success-600 hover:bg-success-700 text-white border border-transparent focus:ring-success-500',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white border border-transparent focus:ring-danger-500',
    warning: 'bg-warning-600 hover:bg-warning-700 text-white border border-transparent focus:ring-warning-500',
    info: 'bg-blue-500 hover:bg-blue-600 text-white border border-transparent focus:ring-blue-400',
    outline: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-primary-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent focus:ring-gray-500',
  };
  
  const sizeStyles = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const disabledStyles = disabled || isLoading
    ? 'opacity-60 cursor-not-allowed'
    : 'cursor-pointer';
  
  const widthStyles = isFullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

export default Button