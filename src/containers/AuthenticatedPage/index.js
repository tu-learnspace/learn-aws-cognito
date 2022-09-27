import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { authRoutes } from 'routes';
import Header from 'components/Header';
import ErrorPageNotFound from 'components/PageNotFound';
import Unauthorized from 'containers/Unauthorized';
import LogOutButton from 'containers/AuthenticatedPage/LogOutButton';
import { selectCurrentUser } from 'containers/App/selectors';
import { getCurrentUser } from 'utilities/userManager';

import useHooks from './hooks';


const AuthenticatedPage = () => {
  const isAuthorized = true;
  const { name, email } = useSelector(selectCurrentUser);
  const a = getCurrentUser();
  console.log('[AuthenticatedPage] a: ', a);
  const { headerName } = useHooks();
  const { t } = useTranslation();

  return (
    <>
      {isAuthorized && (
        <>
          { headerName && <Header headerName={t(headerName)} userName={name + ' ' + email} children={<LogOutButton/>}/> }
          <Switch>
            {authRoutes.map(({ path, exact, component }) => {
              return (
                <Route key={path} path={path} exact={exact} component={component}/>
              );
            })}
            <Route path='' component={ErrorPageNotFound} />
          </Switch>
        </>
      )}
      {!isAuthorized && (<><Unauthorized /></>)}
    </>
  );
};

export default AuthenticatedPage;
