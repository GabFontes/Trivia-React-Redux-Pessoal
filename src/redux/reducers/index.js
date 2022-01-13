import { combineReducers } from 'redux';
import user from './user';
import token from './saveToken';

const rootReducer = combineReducers({ user, token });

export default rootReducer;
