import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Unauthorized from 'containers/Unauthorized';
import AppLayout from 'containers/AppLayout';

import { useInjectReducer } from 'utilities/redux-injectors';

import { reducer, sliceKey } from './slice';


const App = () => {
  useInjectReducer({
    key: sliceKey,
    reducer,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/unauthorized'
            component={Unauthorized}
          />
          <Route component={AppLayout} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
