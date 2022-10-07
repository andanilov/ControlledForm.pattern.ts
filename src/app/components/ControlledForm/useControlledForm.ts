import React, { useState } from 'react';
import {
  IDataFields,
  IElementsMap,
  IUseControlledForm,
  IValidateRulesData,
} from './types';
import validator, { IRules, rules, Fnctn } from './validator';

export default function useControlledForm({
  dataInit,
  dataRulesMapInit,
  errorInit,
} : IElementsMap) {
  const [data, setData] = useState<IDataFields>(dataInit);
  const [dataRulesMap] = useState<IValidateRulesData>(dataRulesMapInit);
  const [error, setError] = useState<IDataFields>(errorInit);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData((prevData) => ({ ...prevData, [target.name]: target.value }));
  };

  const validate = (): number => {
    // - 1. Check every field if errors exist
    const currentError = Object.entries(dataRulesMap).reduce((errrsAcc, [name, rls]) => {
      // Get errors for field
      const errs = Object.entries(rls).reduce((rlsField: string[], [rl, argv]) => {
        const err = validator(rules[rl as keyof IRules](argv) as Fnctn)(data[name]);
        return err ? [...rlsField, err] : rlsField;
      }, []);

      return errs.length ? { ...errrsAcc, [name]: errs } : errrsAcc;
    }, {});
    // - 2. Update errors state
    setError(() => currentError);

    return Object.keys(currentError).length;
  };

  return {
    data,
    error,
    onChange,
    validate,
  } as IUseControlledForm;
}
