import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

import { SIGN_OUT_PROCESSING_STATUS } from './constants';

export const initialState = {
  user: null,
  status: null,
  locale: ''
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale(state, { payload: language }){
      return set('locale', language)(state);
    },
    storeUserAction(state, { payload: user }) {
      return flow(
        set('user', user),
        set('isUserLoaded', true)
      )(state);
    },
    setAuthorizedAction(state, { payload: isAuthorized }) {
      return set('isAuthorized', isAuthorized)(state);
    },
    signOut(state) {
      return set('status', SIGN_OUT_PROCESSING_STATUS.ONGOING)(state);
    },
    signOutRedirect(state) {
      return state;
    },
    updateAppStatus(state, { payload: status }) {
      return set('status', status)(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
