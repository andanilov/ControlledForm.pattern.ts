import React from 'react';
import LabelWrapper from '../LabelWrapper';
import { ISelectField } from '../types';

const SelectField = ({
  name,
  label,
  error,
  options,
  placeholder,
  className,
  ...props
} : ISelectField) => (
  <LabelWrapper label={label} error={error}>
    <select
      name={name}
      className={className || ''}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map(({ title, value }) => (
        <option value={value} key={value}>
          {title}
        </option>))}
    </select>
  </LabelWrapper>
);

export default SelectField;
