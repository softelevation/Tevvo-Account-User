import {ActionConstants} from './constants';

export const resetStore = () => {
  return {
    type: ActionConstants.RESET_STORE,
  };
};
