import {combineReducers} from 'redux';
import {corporate} from './corporate-account/reducer';
import {trips} from './current/reducer';
import {savedTrip} from './activity/reducer';
const trip = combineReducers({
  corporate,
  trips,
  savedTrip,
});
export default trip;
