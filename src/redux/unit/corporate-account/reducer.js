import {ActionConstants} from '../../constants';

const initialState = {
  loading: false,
  data: [],
  error: '',
  isSuccess: false,
};
export function corporate(state = initialState, action) {
  switch (action.type) {
    case ActionConstants.CORPORATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionConstants.CORPORATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        isSuccess: true,
      };
    case ActionConstants.CORPORATE_ACCOUNT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default corporate;
