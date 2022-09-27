import { useCallback, useEffect, useState } from 'react'

import isEmpty from 'lodash/fp/isEmpty';

import { getCurrentUser } from 'utilities/userManager';


const useAuthenticated = async () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect( () => {
    const currentUser = getCurrentUser();
    console.log('[useAuthenticated] currentUser: ', currentUser);
    setIsAuthenticated(!isEmpty(currentUser))
    console.log('[useAuthenticated] isAuthenticated: ', isAuthenticated);
  }, []);

  return {
    isAuthenticated,
    // currentUser
  };
};

export default useAuthenticated;
