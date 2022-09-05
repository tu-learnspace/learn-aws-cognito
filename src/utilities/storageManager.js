import isNil from 'lodash/fp/isNil';

export const setItem = (key, value) => {
  if (isNil(key) || isNil(value)) {
    return '';
  }
  const strValue = JSON.stringify(value);
  return localStorage.setItem(key, strValue);
};

export const getItem = (key) => {
  if (isNil(key)) {
    return '';
  }
  const strValue = localStorage.getItem(key);
  return JSON.parse(strValue);
};

export const deleteAllItems = () => {
  return localStorage.clear();
};
