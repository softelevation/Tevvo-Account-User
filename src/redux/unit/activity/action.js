import {ActionConstants} from '../../constants';

export const tripSavedSuccess = (data) => {
  return {
    type: ActionConstants.TRIP_SAVED_SUCCESS,
    data,
  };
};
export const tripSavedFlush = () => {
  return {
    type: ActionConstants.TRIP_SAVED_FLUSH,
  };
};
