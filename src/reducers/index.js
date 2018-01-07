import { combineReducers } from 'redux';

import WeekReducer from './WeekReducer';
import AuthReducer from './AuthReducer';
import GamesReducer from './GamesReducer';
import PicksReducer from './PicksReducer';
import ResultsReducer from './ResultsReducer';
import UsersReducer from './UsersReducer';
import NumsUsedReducer from './NumsUsedReducer';


const rootReducer = combineReducers({
  auth: AuthReducer,
  week: WeekReducer,
  games: GamesReducer,
  picks: PicksReducer,
  results: ResultsReducer,
  users: UsersReducer,
  numsUsed: NumsUsedReducer
});

export default rootReducer;
