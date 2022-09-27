import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { actions as appActions } from 'containers/App/slice';
import { getCurrentUser } from 'utilities/userManager';

export default function* saga() {
  yield all([fork(userWatcher)]);
}

export function* userWatcher() {
  yield takeLatest(appActions.getUserInfoAction.type, getUserLoginInfo);
}

// execute clear section & redirect to M$ logout page.
export function* getUserLoginInfo() {
  const res = yield call(getCurrentUser);
  if (res) {
    yield put(appActions.setUserInfoAction(res));
  }
}
