import history from 'utilities/history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });
}
