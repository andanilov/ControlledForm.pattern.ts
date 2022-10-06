import React from 'react';
import LabelWrapper from '../LabelWrapper';
import { ITextField } from '../types';

const TextField = ({ name, label, ...props } : ITextField) => (
  <LabelWrapper label={label}>
    <input type="text" name={name} {...props} />
  </LabelWrapper>
);

export default TextField;
