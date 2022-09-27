import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import useAuthenticated from "hooks/useAuthenticated";
import { getCurrentUser } from './userManager';
import isEmpty from 'lodash/fp/isEmpty';


// luc nay get tu selector 
const ProtectedRoute = ({ children }) => {
  const { userName } = getCurrentUser();
  console.log('[ProtectedRoute], userName: ', userName);

  if (!userName) {
    return <Redirect to='/login'/>;
  }

  return children;
};

export default ProtectedRoute;
