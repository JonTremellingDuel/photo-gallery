// reducers/index.js
import { combineReducers } from 'redux';
import persistedReducer from './persistedReducer';
import throwawayReducer from './throwawayReducer';

const rootReducer = combineReducers({
  persisted: persistedReducer,
  throwaway: throwawayReducer
});

export default rootReducer;
