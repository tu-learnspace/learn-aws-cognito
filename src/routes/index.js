import React from 'react';
import { Redirect } from 'react-router-dom';
import HomeApp from 'containers/HomePage/HomeApp';
import ErrorPageNotFound from 'components/PageNotFound';
import { defaultPath, APP_PATH, NAME } from './constant';


const externalRoutes = [
  {
    path: APP_PATH.DEFAULT,
    exact: true,
    component: () => <Redirect to={defaultPath}/>, // when enter '/' will be redirected to '/home'
  },
  {
    name: NAME.homePage,  // this info will be rendered in Header (headerName)
    path: APP_PATH.HOME,
    exact: true,
    component: HomeApp,
  },
  {
    name: NAME.pageNotFound,
    path: APP_PATH.NOT_FOUND,
    component: ErrorPageNotFound,
  },
];

export const authRoutes = [...externalRoutes];

export default {
  authRoutes,
};
