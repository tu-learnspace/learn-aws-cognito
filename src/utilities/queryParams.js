import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const query = useLocation();
  return new URLSearchParams(query.search);
};

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getSearchParameters() {
  const url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  const obj = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  return obj;
}

export function getSearchParametersByName(name) {
  const obj = getSearchParameters();
  return obj?.[name];
}

export function buildQueryParams(params) {
  return Object.entries(params).reduce((preValue, currentValue, number) => {
    if (number === 0) {
      return `?${currentValue[0]}=${currentValue[1]}`;
    }
    return `${preValue}&${currentValue[0]}=${currentValue[1]}`;
  }, null);
}


export default useQuery;
