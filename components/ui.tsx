
import React from 'react';
import { OptionType } from '../types'; // Adjust path if needed
import { ChevronDownIcon } from './icons'; // Adjust path if needed
import { useTranslation } from '../hooks/useTranslation'; // Adjust path if needed

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  let variantStyle = '';
  let sizeStyle = '';

  switch (variant) {
    case 'primary':
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      variantStyle = 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400';
      break;
    case 'outline':
      variantStyle = 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500';
      break;
  }

  switch (size) {
    case 'sm':
      sizeStyle = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyle = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyle = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 ${className}`}
      {...props}
    />
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 ${className}`}
      rows={4}
      {...props}
    />
  );
};


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionType[];
}

export const Select: React.FC<SelectProps> = ({ className = '', options, ...props }) => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <select
        className={`block w-full appearance-none bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className="text-gray-900">
            {t(option.labelKey)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDownIcon className="w-4 h-4"/>
      </div>
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-xl transition-shadow duration-200' : '';
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
  </div>
);