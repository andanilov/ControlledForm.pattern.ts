import React, { useState } from 'react';
import { IDataFields, IUseControlledForm, IValidateRulesData } from './types';
import validator, { IRules, rules, Fnctn } from './validator';

export default function useControlledForm() {
  const [data, setData] = useState<IDataFields>({});
  const [dataRulesMap, setDataRulesMap] = useState<IValidateRulesData>({});
  const [error, setError] = useState<IDataFields>({});

  const updateData = (newData: IDataFields): void =>
    setData((prevData) => ({ ...prevData, ...newData }));

  const updateDataRulesMap = (newDataRules: IValidateRulesData): void =>
    setDataRulesMap((prevData) => ({ ...prevData, ...newDataRules }));

  const updateErrors = (errors: IDataFields): void =>
    setError((prevData) => ({ ...prevData, ...errors }));

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    updateData({ [target.name]: target.value });

  const validate = (): number => {
    // - 1. Check every field if errors exist
    const currentError = Object.entries(dataRulesMap).reduce((errrsAcc, [name, rls]) => {
      // Get errors for field
      const errs = Object.entries(rls).reduce((rlsField: string[], [rl, msg]) => {
        const err = validator(rules[rl as keyof IRules](msg) as Fnctn)(data[name]);
        return err ? [...rlsField, err] : rlsField;
      }, []);

      return errs.length ? { ...errrsAcc, [name]: errs } : errrsAcc;
    }, {});

    // - 2. Update errors state
    setError(currentError);

    return Object.keys(currentError).length;
  };

  return {
    data,
    error,
    updateErrors,
    onChange,
    updateData,
    setDataRulesMap,
    updateDataRulesMap,
    dataRulesMap,
    validate,
  } as IUseControlledForm;
}
