import {ActionConstants} from '../../constants';
// Agent List
export const currentUnitRequest = (payload) => {
  return {
    type: ActionConstants.CURRENT_UNIT_REQUEST,
    payload,
  };
};
export const currentUnitSuccess = (data) => {
  return {
    type: ActionConstants.CURRENT_UNIT_SUCCESS,
    data,
  };
};
export const currentUnitError = (error) => {
  return {
    type: ActionConstants.CURRENT_UNIT_ERROR,
    error,
  };
};
