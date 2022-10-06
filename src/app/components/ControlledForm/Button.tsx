import React from 'react';
import { IButton } from './types';

const Button = ({ children, type, ...rest } : IButton) => (
  <button
    {...rest}
    type={type || 'button'}
  >
    {children}
  </button>
);

export default Button;
