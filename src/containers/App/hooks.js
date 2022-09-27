import { useEffect } from 'react';

import { getCurrentUser } from 'utilities/userManager';

const useHooks = () => {

  const initializeUser = async () => {
    const user = await getCurrentUser();
    console.log('[App][initializeUser] user: ', user);
  };

  useEffect(() => {
    initializeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useHooks;
