import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utilities/redux-injectors';

import Unauthorized from 'containers/Unauthorized';
import LoginPage from 'containers/LoginPage';
import AppLayout from 'containers/AppLayout';
import PublicPage from 'containers/PublicPage';

import { reducer, sliceKey } from './slice';
import useHooks from './hooks';
import saga from './saga';

const App = () => {
  useInjectReducer({
    key: sliceKey,
    reducer,
  });
  useInjectSaga({ key: sliceKey, saga });
  useHooks();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/unauthorized' component={Unauthorized}/>
          <Route exact path='/public' component={PublicPage}/>
          <Route component={AppLayout}/>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
