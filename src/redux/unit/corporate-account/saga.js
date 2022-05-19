import {ActionConstants} from '../../constants';
import {corporateAccountsError, corporateAccountsSuccess} from './action';
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
      API_URL.CORPORATE_ACCOUNTS,
      action.payload,
    ); //POST request
    const dataResponse = decrypted(response.data);

    if (response.status === 1) {
      yield put(corporateAccountsSuccess(dataResponse));
    } else {
      onDisplayNotification(response.message);
      yield put(corporateAccountsError(response));
    }
  } catch (err) {
    onDisplayNotification('Oops something went wrong');
    yield put(corporateAccountsError());
  }
}
export function* corporateAccountWatcher() {
  yield all([takeLatest(ActionConstants.CORPORATE_ACCOUNT_REQUEST, request)]);
}
export default corporateAccountWatcher;
