import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useInjectReducer } from 'utilities/redux-injectors';

import Unauthorized from 'containers/Unauthorized';
import Login from 'containers/Login';
import AppLayout from 'containers/AppLayout';

import { reducer, sliceKey } from './slice';
import useHooks from './hooks';

const App = () => {
  useInjectReducer({
    key: sliceKey,
    reducer,
  });
  useHooks();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/unauthorized' component={Unauthorized}/>
          <Route component={AppLayout}/>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
