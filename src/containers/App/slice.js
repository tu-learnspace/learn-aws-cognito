import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';

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
    }
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
