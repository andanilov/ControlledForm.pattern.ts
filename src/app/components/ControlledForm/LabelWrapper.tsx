import React, { FC } from 'react';
import { ILabelWrapper } from './types';

const LabelWrapper : FC<ILabelWrapper> = ({ label, children }) => label
  ? <label>
    {label}
    {children}
  </label>
  : <>{children}</>;

export default LabelWrapper;
