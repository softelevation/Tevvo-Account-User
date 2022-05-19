import {ActionConstants} from '../constants';
import {createTripError, createTripSuccess} from './action';
import {put, call, all, takeLatest} from 'redux-saga/effects';
import {apiCall} from '../store/api-client';
import {API_URL} from 'src/utils/config';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import {decrypted} from 'src/utils/commonUtils';
import {RouteNames} from '_routeName';
import * as navigation from 'src/routes/NavigationService';

export function* request(action) {
  try {
    const response = yield call(
      apiCall,
      'POST',
      API_URL.CREATE_TRIP,
      action.payload,
    ); //Get request
    const dataResponse = decrypted(response.data);
    if (response.status === 1) {
      yield put(createTripSuccess(dataResponse));
      navigation.navigate(RouteNames.REVIEW_DETAILS_SCREEN, {
        data: dataResponse,
      });
      onDisplayNotification(response.message);
    } else {
      onDisplayNotification(response.message);
      yield put(createTripError(response));
    }
  } catch (err) {
    onDisplayNotification(err.data.message);
    yield put(createTripError());
  }
}
export function* tripWatcher() {
  yield all([takeLatest(ActionConstants.CREATE_TRIP_REQUEST, request)]);
}
export default tripWatcher;
