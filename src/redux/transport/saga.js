import {ActionConstants} from '../constants';
import {transportError, transportSuccess} from './action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {apiCall} from '../store/api-client';
import {API_URL} from 'src/utils/config';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import {decrypted} from 'src/utils/commonUtils';
export function* request(action) {
  try {
    const response = yield call(apiCall, 'GET', API_URL.TRANSPORT_URL); //Get request
    const dataResponse = decrypted(response.data);
    if (response.status === 1) {
      yield put(transportSuccess(dataResponse));
    } else {
      onDisplayNotification(response.message);
      yield put(transportError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(transportError());
  }
}
export function* socketRequest(action) {
  try {
    const response = yield call(apiCall, 'GET', API_URL.TRANSPORT_URL); //Get request
    const dataResponse = decrypted(response.data);
    if (response.status === 1) {
      yield put(transportSuccess(dataResponse));
    } else {
      onDisplayNotification(response.message);
      yield put(transportError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(transportError());
  }
}
export function* transportWatcher() {
  yield all([takeLatest(ActionConstants.TRANSPORT_REQUEST, request)]);
  yield all([
    takeLatest(ActionConstants.SOCKET_TRANSPORT_REQUEST, socketRequest),
  ]);
}
export default transportWatcher;
