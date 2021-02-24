import { combineReducers } from 'redux';

import commentsReducer from './commentsReducer.js';
import screenReducer from './screenReducer.js';
import postReducer from './postReducer.js';

export default combineReducers({
  comments: commentsReducer,
  screen: screenReducer,
  post: postReducer,
});
