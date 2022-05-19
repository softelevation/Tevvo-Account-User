import {combineReducers} from 'redux';
import auth from './login/reducer';
import allTrips from './unit/reducer';
import location from './location/reducer';
import transport from './transport/reducer';
import capability from './capability/reducer';
import trip from './trip/reducer';
import {ActionConstants} from './constants';

const appReducer = combineReducers({
  location,
  auth,
  allTrips,
  transport,
  capability,
  trip,
});
const rootReducer = (state, action) => {
  if (action.type === ActionConstants.RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
