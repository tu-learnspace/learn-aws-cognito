import React from 'react';
import { useTranslation } from 'react-i18next';

import { authRoutes } from 'routes';
import Header from 'components/Header';
import Unauthorized from 'containers/Unauthorized';
import ErrorPageNotFound from 'components/PageNotFound';
import { Route, Switch } from 'react-router-dom';

import useHooks from './hooks';

const AuthenticatedPage = () => {
  const isAuthenticated = true;
  const { headerName } = useHooks();
  const { t } = useTranslation();

  return (
    <>
      {isAuthenticated && (
        <>
          {/*<Sidebar/>*/}
          { headerName && <Header headerName={t(headerName)}/> }
          <Switch>
            {authRoutes.map((route) => {
              const { path, exact, component } = route;
              return (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={component}
                />
              );
            })}
            <Route path='' component={ErrorPageNotFound} />
          </Switch>
        </>
      )}
      {!isAuthenticated && (<><Unauthorized /></>)}
    </>
  );
};

export default AuthenticatedPage;
