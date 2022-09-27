import { call, all, fork, takeLatest } from 'redux-saga/effects';
import { actions as appActions } from 'containers/App/slice';
import { onSignOut } from 'utilities/userManager';

export default function* saga() {
  yield all([
    fork(signOutTaskWatcher),
  ]);
}

export function* signOutTaskWatcher() {
  yield takeLatest(appActions.signOut.type, signOutTask);
}

export function* signOutTask() {
  yield call(onSignOut);
}
