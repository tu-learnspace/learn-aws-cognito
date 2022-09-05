import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useActions from 'hooks/useActions';
import { actions } from 'containers/App/slice';
import { getUser } from 'utilities/userManager';
import { setItem, deleteAllItems } from 'utilities/storageManager';

const useHooks = () => {
  const history = useHistory();
  const { storeUserAction } = actions;
  const { storeUser } = useActions({
    storeUser: storeUserAction,
  }, [storeUserAction]);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);


  const handleLogIn = useCallback( async() => {
    setIsBackdropOpen(!isBackdropOpen);
    const user = await getUser();
    setIsBackdropOpen(false);
    storeUser(user);
    setItem('user', user);
    history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser]);

  useEffect(() => {
    deleteAllItems();
  }, []);

  return {
    states: {
      isBackdropOpen,
    },
    handlers: {
      handleLogIn,
    }
  };
};

export default useHooks;
