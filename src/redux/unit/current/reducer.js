import {ActionConstants} from '../../constants';
const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function trips(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CURRENT_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.CURRENT_UNIT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        isSuccess: true,
      };
    case ActionConstants.CURRENT_UNIT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default trips;
