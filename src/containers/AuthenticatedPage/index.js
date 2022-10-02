import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { authRoutes } from 'routes';
import Header from 'components/Header';
import ErrorPageNotFound from 'components/PageNotFound';
import Unauthorized from 'containers/Unauthorized';
import LogOutButton from 'containers/AuthenticatedPage/LogOutButton';
import useAuthenticated from 'hooks/useAuthenticated';
import useHooks from './hooks';


const AuthenticatedPage = () => {
  const { isAuthenticated, onSignOut, currentUser } = useAuthenticated();
  const { username } = currentUser ? currentUser : '';
  const isAuthorized = true;
  const { headerName } = useHooks();
  const { t } = useTranslation();

  return (
    <>
      { headerName && <Header headerName={t(headerName)} userName={username} children={<LogOutButton onSignOut={onSignOut} />}/> }
      { isAuthenticated && isAuthorized && (
        <Switch>
          {authRoutes.map(({ path, exact, component }) => {
            return (
              <Route key={path} path={path} exact={exact} component={component}/>
            );
          })}
          <Route path='' component={ErrorPageNotFound} />
        </Switch>
      )}
      { isAuthenticated && !isAuthorized && (
        <>
          <Header headerName={t(headerName)} userName={username} children={<LogOutButton onSignOut={onSignOut}/>}/>
          <Unauthorized />
        </>
      )}
    </>
  );
};

export default AuthenticatedPage;
