import {combineReducers} from 'redux';
import {ActionConstants} from '../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function transport(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.TRANSPORT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.TRANSPORT_SUCCESS:
      return {
        ...state,
        data: action.data,
        isSuccess: true,
        loading: false,
      };
    case ActionConstants.TRANSPORT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ActionConstants.SOCKET_TRANSPORT_REQUEST:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

const transportReducer = combineReducers({
  transport,
});
export default transportReducer;
