import {ActionConstants} from '../constants';
// Agent List
export const capabilityRequest = (payload) => {
  return {
    type: ActionConstants.CAPABILITY_REQUEST,
    payload,
  };
};
export const capabilitySuccess = (data) => {
  return {
    type: ActionConstants.CAPABILITY_SUCCESS,
    data,
  };
};
export const capabilityError = (error) => {
  return {
    type: ActionConstants.CAPABILITY_ERROR,
    error,
  };
};
