type ErrorMessage = string | undefined;
type Rule = string | false;
type ValidateResult = number | string | object | Array<object>;
export type Fnctn = (a?: ValidateResult) => string;

export interface IRules {
  isRequired: (e?: ErrorMessage) => (data: string | object | Array<object>) => Rule;
  isEmail: (e?: ErrorMessage) => (data: string) => Rule;
  isYearBorn: (e?: ErrorMessage) => (data: string | number) => Rule;
  isLink: (e?: ErrorMessage) => (data: string) => Rule;
}

export const rules : IRules = {
  isRequired: (error = 'Обязательное поле!') =>
    (data) => {
      if (Array.isArray(data)) {
        return data.length ? false : error;
      }
      if (typeof data === 'object') {
        return Object.keys(data).length ? false : error;
      }
      return data ? false : error;
    },

  isEmail: (error = 'Неверный формат Email') =>
    (data) => (data.toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ? false
      : error),

  isYearBorn: (error = 'Год рождения некорректен') =>
    (data) => (+data < (new Date().getFullYear() - 110) || +data >= new Date().getFullYear()
      ? error
      : false),

  isLink: (error = 'Неверный формат ссылки') =>
    (data) => (data.toLowerCase()
      .match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
      ? false
      : error),
};

export default (...fns : Fnctn[]) =>
  (x : ValidateResult) : string => {
    try {
      fns.reduce((a, f) => {
        const currentError : string | false = f(a);
        if (currentError) {
          throw new Error(currentError);
        }
        return a;
      }, x);
    } catch (e) {
      if (typeof e === 'string') {
        return e;
      }
      if (e instanceof Error) {
        return e.message;
      }
    }

    return '';
  };
