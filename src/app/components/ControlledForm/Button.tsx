import React from 'react';
import { IButton } from './types';

const Button = ({
  children,
  type,
  loading,
  ...rest
} : IButton) => (
  <button
    {...rest}
    type={type || 'button'}
    disabled={loading || false}
  >
    {loading ? 'Загрузка!' : children}
  </button>
);

export default Button;
