import { useEffect } from 'react';

import useActions from 'hooks/useActions';
import { loadUserFromLocalStorage } from 'utilities/userManager';

import { actions } from './slice';

const useHooks = () => {
  const { storeUserAction } = actions;
  const { storeUser } = useActions({
    storeUser: storeUserAction,
  }, [storeUserAction]);

  const initializeUser = () => {
    const user = loadUserFromLocalStorage();
    storeUser(user);
  };

  useEffect(() => {
    initializeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useHooks;
