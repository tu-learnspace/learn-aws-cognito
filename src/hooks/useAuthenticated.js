import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from 'containers/App/selectors';
import { actions } from 'containers/App/slice';

import useActions from './useActions';

const useAuthenticated = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const history = useHistory();

  const { signOut } = actions;
  const { signOutAction } = useActions({
    signOutAction: signOut,
  }, [signOut]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history]);

  const onSignOut = useCallback(() => {
    // dispatch some actions before do signOut redirect
    signOutAction();
    history.push('/login');
  }, [signOutAction, history]);

  return { isAuthenticated, currentUser, onSignOut };
};

export default useAuthenticated;
