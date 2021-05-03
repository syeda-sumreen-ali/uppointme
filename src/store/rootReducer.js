import {combineReducers} from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReucer,
});

export default rootReducer;
