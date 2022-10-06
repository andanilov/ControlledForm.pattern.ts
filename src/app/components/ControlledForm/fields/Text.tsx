import React from 'react';
import LabelWrapper from '../LabelWrapper';
import { ITextField } from '../types';

const TextField = ({
  name,
  label,
  type,
  error,
  ...props
} : ITextField) => (
  <LabelWrapper label={label}>
    <input
      type={type || 'text'}
      name={name}
      autoComplete={type === 'password' ? 'on' : 'off'}
      {...props}
    />
    {error && '!!!!!'}
  </LabelWrapper>
);

export default TextField;
