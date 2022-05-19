import {all} from 'redux-saga/effects';
import {authWatcher} from './login/saga';
import currentUnitWatcher from './unit/current/saga';
import {corporateAccountWatcher} from './unit/corporate-account/saga';
import {transportWatcher} from './transport/saga';
import {capabilityWatcher} from './capability/saga';
import {tripWatcher} from './trip/saga';
export default function* rootSaga() {
  yield all([
    authWatcher(),
    corporateAccountWatcher(),
    currentUnitWatcher(),
    transportWatcher(),
    capabilityWatcher(),
    tripWatcher(),
  ]);
}
