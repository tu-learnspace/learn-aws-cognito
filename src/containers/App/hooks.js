import { useEffect } from 'react';
import useActions from 'hooks/useActions';
import { getCurrentUser } from 'utilities/userManager';
import { actions } from './slice';

const useHooks = () => {
  const { getUserInfo } = useActions({
    getUserInfo: actions.getUserInfoAction,
  }, [actions.getUserInfoAction]);

  const initializeUser = async () => {
    const user = await getCurrentUser();
    getUserInfo();
    console.log('[App][initializeUser] user: ', user);
  };

  useEffect(() => {
    initializeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useHooks;
