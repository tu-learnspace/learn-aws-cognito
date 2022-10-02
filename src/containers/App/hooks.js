import { useEffect } from 'react';
import { Hub } from 'aws-amplify';
import useActions from 'hooks/useActions';
import { getCurrentUser } from 'utilities/userManager';
import { actions } from './slice';

const useHooks = () => {
  const { storeUserAction } = actions;
  const { storeUser } = useActions({
    storeUser: storeUserAction
  }, [storeUserAction]);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log('[App][initializeUser] user: ', user);
        storeUser(user);
      } catch (err) {
        console.log('[App][initializeUser] err: ', err)
      }
    };

    initializeUser();
  }, [storeUser]);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log('HUB nghe roi ne');
          break;
        case "signOut":
          break;
        case "customOAuthState":
          alert('custom state');
          break;
        default:
      }
    });
  }, []);
};

export default useHooks;
