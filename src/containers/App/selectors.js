import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import { createSelector } from 'reselect';

import { initialState, sliceKey } from './slice';


export const selectApp = (state) => getOr(initialState, sliceKey)(state);

export const selectAppLanguage = createSelector(selectApp, (state) => {
  return get('locale')(state);
});
export const selectCurrentUser = createSelector(selectApp, (state) => {
  return get('user')(state) || {};
});
export const selectIsAuthenticated = createSelector(selectCurrentUser, (user) => {
  return !isEmpty(user);
});
export const selectIsUserLoaded = createSelector(selectApp, (state) => {
  return get('isUserLoaded')(state) || false;
});
export const selectIsAuthorized = createSelector(selectApp, (state) => {
  return get('isAuthorized')(state);
});
export const selectAppStatus = createSelector(selectApp, (state) => {
  return get('status')(state);
});
