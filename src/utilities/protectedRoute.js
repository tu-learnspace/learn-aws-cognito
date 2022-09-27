import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import useAuthenticated from "hooks/useAuthenticated";
import { getCurrentUser } from './userManager';
import isEmpty from 'lodash/fp/isEmpty';


const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated } = useAuthenticated();
  // console.log('[ProtectedRoute], isAuthenticated: ', isAuthenticated);
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Redirect to='/login'/>;
  }

  return children;
};

export default ProtectedRoute;
