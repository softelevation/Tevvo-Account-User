import {ActionConstants} from '../constants';
import {capabilityError, capabilitySuccess} from './action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {apiCall} from '../store/api-client';
import {API_URL} from 'src/utils/config';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import {decrypted} from '../../utils/commonUtils';

export function* request(action) {
  try {
    const response = yield call(
      apiCall,
      'GET',
      API_URL.CAPABILITY_URL,
      action.payload,
    ); //Get request
    const dataResponse = decrypted(response.data);
    if (response.status === 1) {
      yield put(capabilitySuccess(dataResponse));
    } else {
      onDisplayNotification(response.message);
      yield put(capabilityError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(capabilityError());
  }
}
export function* capabilityWatcher() {
  yield all([takeLatest(ActionConstants.CAPABILITY_REQUEST, request)]);
}
export default capabilityWatcher;
