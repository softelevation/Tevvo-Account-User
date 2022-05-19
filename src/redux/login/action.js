import {ActionConstants} from '../constants';
// Agent List
export const authRequest = (payload) => {
  return {
    type: ActionConstants.LOGIN_REQUEST,
    payload,
  };
};
export const authSuccess = (data) => {
  return {
    type: ActionConstants.LOGIN_SUCCESS,
    data,
  };
};
export const authError = (error) => {
  return {
    type: ActionConstants.LOGIN_ERROR,
    error,
  };
};
export const profileRequest = () => {
  return {
    type: ActionConstants.PROFILE_REQUEST,
  };
};
export const profileSuccess = (data) => {
  return {
    type: ActionConstants.PROFILE_SUCCESS,
    data,
  };
};
export const profileError = (error) => {
  return {
    type: ActionConstants.PROFILE_ERROR,
    error,
  };
};
