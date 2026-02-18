'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  className?: string;
  error?: string;
  required?: boolean;
  animate?: boolean;
  id?: string;
  name?: string;
  rows?: number;
  autoComplete?: string;
}

export const GlassInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  error,
  required = false,
  animate = true,
  id,
  name,
  rows,
  autoComplete
}: GlassInputProps) => {
  const baseClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all caret-indigo-500 relative z-10 cursor-text [-webkit-appearance:none] [appearance:none]";
  const textareaClasses = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 placeholder-slate-400 resize-none";

  const containerClasses = "space-y-2";

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={containerClasses}
      >
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            required={required}
            rows={rows}
            placeholder={placeholder}
            className={`${textareaClasses} ${error ? 'border-destructive focus:ring-destructive/50' : ''} ${className}`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            required={required}
            className={`${baseClasses} ${error ? 'border-destructive focus:ring-destructive/50' : ''} ${className}`}
          />
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={`${textareaClasses} ${error ? 'border-destructive focus:ring-destructive/50' : ''} ${className}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          required={required}
          className={`${baseClasses} ${error ? 'border-destructive focus:ring-destructive/50' : ''} ${className}`}
        />
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};