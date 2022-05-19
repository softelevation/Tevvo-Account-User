import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: {},
  error: '',
  isSuccess: false,
  profile: {},
};
export function login(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isSuccess: true,
        loading: false,
      };
    case ActionConstants.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ActionConstants.PROFILE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case ActionConstants.PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.data,
        loading: false,
      };
    case ActionConstants.PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}

const auth = combineReducers({
  login,
});
export default auth;
