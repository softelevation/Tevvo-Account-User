import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function trip(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CREATE_TRIP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.CREATE_TRIP_SUCCESS:
      return {
        ...state,
        data: action.data,
        isSuccess: true,
        loading: false,
      };
    case ActionConstants.CREATE_TRIP_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
export default trip;
