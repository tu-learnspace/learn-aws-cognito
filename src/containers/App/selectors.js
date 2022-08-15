import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import { createSelector } from 'reselect';

import { initialState, sliceKey } from './slice';

export const selectApp = (state) => getOr(initialState, sliceKey)(state);
export const selectAppLanguage = createSelector(selectApp, (state) => get('locale')(state));
