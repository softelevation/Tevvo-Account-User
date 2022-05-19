import {ActionConstants} from '../constants';
// Agent List
export const transportRequest = (payload) => {
  return {
    type: ActionConstants.TRANSPORT_REQUEST,
    payload,
  };
};
export const transportSuccess = (data) => {
  return {
    type: ActionConstants.TRANSPORT_SUCCESS,
    data,
  };
};
export const transportError = (error) => {
  return {
    type: ActionConstants.TRANSPORT_ERROR,
    error,
  };
};
export const socketTransportRequest = () => {
  return {
    type: ActionConstants.SOCKET_TRANSPORT_REQUEST,
  };
};
