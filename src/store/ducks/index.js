import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as darkMode } from './darkMode';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    darkMode
  });
