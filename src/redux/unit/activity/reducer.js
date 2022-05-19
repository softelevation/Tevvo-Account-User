import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: {},
  error: '',
  isSuccess: false,
};
export function savedTrip(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.TRIP_SAVED_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case ActionConstants.TRIP_SAVED_FLUSH:
      return {
        loading: false,
        data: {},
        error: '',
        isSuccess: false,
      };

    default:
      return state;
  }
}

export default savedTrip;
