import isEmpty from 'lodash/fp/isEmpty';

import { loadUserFromLocalStorage } from 'utilities/userManager';

const useAuthenticated = () => {
  const currentUser = loadUserFromLocalStorage();
  const isAuthenticated = !isEmpty(currentUser);
  return { isAuthenticated, currentUser };
};

export default useAuthenticated;
