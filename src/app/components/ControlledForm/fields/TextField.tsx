import React, { useEffect } from 'react';
import LabelWrapper from '../LabelWrapper';
import { ITextField } from '../types';

const TextField = ({
  name,
  label,
  type,
  error,
  ...props
} : ITextField) => (
  <LabelWrapper label={label} error={error}>
    <input
      type={type || 'text'}
      name={name}
      autoComplete={type === 'password' ? 'on' : 'off'}
      {...props}
    />
  </LabelWrapper>
);

export default TextField;
