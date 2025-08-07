import React from 'react';

export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-accent text-accent-foreground',
    outline: 'border border-accent text-accent',
    secondary: 'bg-secondary text-secondary-foreground',
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${variants[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
