import { ReactNode, ReactElement } from "react";
import { IRules } from "./validator";

// -- Types
export type EventType = React.FormEvent<HTMLInputElement | HTMLFormElement>;
export type EventHandler = (event: EventType) => void;
export type HandleSubmit = (data: IDataFields, event?: EventType) => any;
export type ValidationRules = {[key in keyof IRules]?: string};
export type FieldError = string | string[];

// -- Fields interfaces
export interface ICommonField {
  name: string,
  label?: string,
  value?: string,
  onChange?: EventHandler,
  noControlled?: boolean,
  defaultValue?: string,
  rules?: ValidationRules,
  error?: FieldError
}

export interface ITextField extends ICommonField {
  placeholder?: string,
  type?: 'text' | 'password', 
}

export interface ILabelWrapper {
  label?: string,
  children: ReactNode | ReactNode[],
}

export interface IButton {
  children: ReactNode | ReactNode[],
  type?: 'submit' | 'reset' | 'button',
}

// -- Form interfaces
export interface IDataFields {
  [index: string]: string | string[]
}

export interface IControlledForm {
  children: ReactElement | ReactElement[],
  handleSubmit?: HandleSubmit,
}

export interface IValidateRulesData {
  [index: string]: ValidationRules,
}

export interface IUseControlledForm {
  data: IDataFields,
  updateData(newData: IDataFields): void,
  error: IDataFields,
  updateErrors(errors: IDataFields): void,
  onChange(event: React.ChangeEvent): void,
  // setDataRulesMap(dataRulesMap: IValidateRulesData): void,
  dataRulesMap: IValidateRulesData,
  updateDataRulesMap(newDataRules: IValidateRulesData): void,
  validate() : number
}
