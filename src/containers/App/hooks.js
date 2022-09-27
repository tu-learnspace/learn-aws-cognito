import { useEffect } from 'react';
import useActions from 'hooks/useActions';
import { getCurrentUser } from 'utilities/userManager';

import { actions } from './slice';

const useHooks = () => {
  const { storeUserAction } = actions;
  const { storeUser } = useActions({
    storeUser: storeUserAction
  }, [storeUserAction]);

  const initializeUser = async () => {
    const user = await getCurrentUser();
    console.log('[initializeUser] user: ', user);
    storeUser(user);
  };

  useEffect(() => {
    initializeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useHooks;
