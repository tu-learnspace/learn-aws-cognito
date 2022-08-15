import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthenticatedPage from 'containers/AuthenticatedPage';

export function AppLayout() {
  return (
    <div className='container'>
      <Switch>
        <Route path='' component={AuthenticatedPage} />
        <Redirect to='' />
      </Switch>
    </div>
  );
}

export default AppLayout;
