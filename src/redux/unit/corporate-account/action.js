import {ActionConstants} from '../../constants';
// Agent List
export const corporateAccountsRequest = () => {
  return {
    type: ActionConstants.CORPORATE_ACCOUNT_REQUEST,
  };
};
export const corporateAccountsSuccess = (data) => {
  return {
    type: ActionConstants.CORPORATE_ACCOUNT_SUCCESS,
    data,
  };
};
export const corporateAccountsError = (error) => {
  return {
    type: ActionConstants.CORPORATE_ACCOUNT_ERROR,
    error,
  };
};
