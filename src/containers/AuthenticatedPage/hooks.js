import { useEffect, useState, useCallback } from 'react';
import { authRoutes } from 'routes';

const useHooks = () => {
  const [headerName, setHeaderName] = useState('');
  const [, setCurrentPath] = useState('/');
  const { pathname } = window.location;

  const getHeaderName = useCallback(() => {
    const path = pathname.split('/');
    const arrayFilter = authRoutes.filter((route) => route.path.startsWith('/' + path[1]));

    if (arrayFilter.length > 0) {
      setHeaderName(arrayFilter[0].name);
      setCurrentPath(arrayFilter[0].path);
    }

  }, [setHeaderName, setCurrentPath, pathname]);

  useEffect(() => {
    getHeaderName();
  }, [getHeaderName]);

  return (
    {headerName}
  );
};

export default useHooks;
