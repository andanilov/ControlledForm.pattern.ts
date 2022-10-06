import React, { useEffect, useMemo } from 'react';
import useControlledForm from './useControlledForm';
import {
  IDataFields,
  IControlledForm,
  EventHandler,
  IValidateRulesData,
} from './types';

export default function ControlledForm({ children, handleSubmit } : IControlledForm) {
  const {
    data,
    error,
    updateErrors,
    onChange,
    updateData,
    dataRulesMap,
    updateDataRulesMap,
    validate,
  } = useControlledForm();
  const initData : IDataFields = {};
  const validateRules : IValidateRulesData = {};

  // - Checking children and modifying controlled fields by React.cloneElement()
  children = useMemo(() => {
    // If children is alone convert it to array
    !Array.isArray(children) && (children = [children]);

    return (children.map((child) => {
      const { type, props } = child;
      let addToProps = {};

      // Controlled field
      if (typeof type === 'function' && !props?.noControlled && props?.name) {
        // 1. Set initial value
        !data[props.name] && updateData({ [props.name]: props?.value || '' });

        // 2. Set validate rules
        if (props?.rules) {
          !dataRulesMap[props.name] && updateDataRulesMap({ [props.name]: props.rules });
          !error[props.name] ?? updateErrors({ [props.name]: '' });
        }

        addToProps = {
          ...addToProps,
          onChange,
          value: data[props.name],
          error: error[props.name],
        };
      }

      return Object.keys(addToProps).length
        ? React.cloneElement(child, {
          ...props,
          ...addToProps,
          key: props?.name || ~~(Math.random() * 10e5),
        })
        : child;
    }));
  }, []);

  const onSubmit : EventHandler = (event) => {
    event.preventDefault();
    handleSubmit
    && !validate()
    && handleSubmit(data, event);
  };

  return <form onSubmit={onSubmit}>{children}</form>;
}
