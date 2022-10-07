import React, { useMemo } from 'react';
import useControlledForm from './useControlledForm';
import {
  IControlledForm,
  EventHandler,
  IElementsMap,
} from './types';

export default function ControlledForm({ children, handleSubmit } : IControlledForm) {
  // 1. Getting needed controlled elements and initial data
  const elementsMap: IElementsMap = useMemo(() => {
    // If children is alone convert it to array
    !Array.isArray(children) && (children = [children]);

    return children.reduce((map, { type, props }, index) => {
      if (typeof type === 'function' && !props?.noControlled && props?.name) {
        // Remember controlled field index from children
        map.indexes.push(index);
        // Set default value data
        map.dataInit[props.name] = props.value ?? '';
        // Set validator rules and error state for fields
        if (props?.rules) {
          map.dataRulesMapInit[props.name] = props.rules;
          map.errorInit[props.name] = '';
        }
      }
      return map;
    }, {
      indexes: [],
      dataRulesMapInit: {},
      dataInit: {},
      errorInit: {},
    } as IElementsMap);
  }, []);

  // 2. Initializating controlled fields data
  const {
    data,
    error,
    onChange,
    validate,
  } = useControlledForm(elementsMap);

  // 3. Updating condrolled fields if exist
  elementsMap.indexes.length
  && Array.isArray(children)
  && (children = children.map((child, index) => {
    elementsMap.indexes.includes(index) && (child = React.cloneElement(child, {
      ...child.props,
      value: data[child.props.name],
      onChange,
      error: error[child.props.name],
      rules: '',
      key: child.props?.name || ~~(Math.random() * 10e5),
    }));
    return child;
  }));

  const onSubmit : EventHandler = (event) => {
    event.preventDefault();
    handleSubmit
    && !validate()
    && handleSubmit(data, event);
  };

  return <form onSubmit={onSubmit}>{children}</form>;
}
