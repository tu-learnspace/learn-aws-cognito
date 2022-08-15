import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors';

export function useInjectReducer({ key, reducer }) {
  return useReducer({ key, reducer });
}

export function useInjectSaga({ key, saga, sagaInjectionMode = null }) {
  return useSaga({ key, saga, mode: sagaInjectionMode});
}
