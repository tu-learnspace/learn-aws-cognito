import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';

export const initialState = {
  user: null,
  locale: ''
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    storeUserAction(state, { payload: user }) {
      console.log('Store user action: ', user);
      return set('user', user)(state);
    },
    setLocale(state, { payload: language }){
      return set('locale', language)(state);
    },
    signOut(state) {
      // saga watch
      //return set('status', 'GO OUT')(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
