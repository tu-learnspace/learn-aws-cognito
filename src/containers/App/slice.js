import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';

export const initialState = {
  locale: ''
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale(state, { payload: language }){
      return set('locale', language)(state);
    },
    setAuthorizedAction(state, { payload: isAuthorized }) {
      return set('isAuthorized', isAuthorized)(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
