import React from 'react';

import AuthenticatedPage from 'containers/AuthenticatedPage';
import ProtectedRoute from 'utilities/protectedRoute';


export function AppLayout() {
  return (
    <div className='container'>
      <ProtectedRoute
        children={<AuthenticatedPage/>}
      />
    </div>
  );
}

export default AppLayout;
