import {ActionConstants} from '../../constants';
import {currentUnitError, currentUnitSuccess} from './action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {apiCall} from '../../store/api-client';
import {API_URL} from 'src/utils/config';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import {decrypted} from 'src/utils/commonUtils';

export function* request(action) {
  try {
    const response = yield call(
      apiCall,
      'GET',
      API_URL.USER_TRIP,
      action.payload,
    ); //Get request
    const dataResponse = decrypted(response.data);
    if (response.status === 1) {
      yield put(currentUnitSuccess(dataResponse));
    } else {
      onDisplayNotification(response.message);
      yield put(currentUnitError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(currentUnitError());
  }
}
export function* currentUnitWatcher() {
  yield all([takeLatest(ActionConstants.CURRENT_UNIT_REQUEST, request)]);
}
export default currentUnitWatcher;
