import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: {},
  error: '',
  isSuccess: false,
  profile: {},
};
export function capability(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CAPABILITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.CAPABILITY_SUCCESS:
      return {
        ...state,
        data: action.data,
        isSuccess: true,
        loading: false,
      };
    case ActionConstants.CAPABILITY_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default capability;
