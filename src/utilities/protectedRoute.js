import React from 'react';
import { Redirect } from 'react-router-dom';

import useAuthenticated from "hooks/useAuthenticated";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthenticated();

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
