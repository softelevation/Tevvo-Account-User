import {ActionConstants} from '../constants';
// Agent List
export const createTripRequest = (payload) => {
  return {
    type: ActionConstants.CREATE_TRIP_REQUEST,
    payload,
  };
};
export const createTripSuccess = (data) => {
  return {
    type: ActionConstants.CREATE_TRIP_SUCCESS,
    data,
  };
};
export const createTripError = (error) => {
  return {
    type: ActionConstants.CREATE_TRIP_ERROR,
    error,
  };
};
