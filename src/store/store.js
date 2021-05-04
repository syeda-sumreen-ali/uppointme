import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer, userReducer} from './reducers'

export const store = createStore(
    combineReducers({
        auth:authReducer,
        user:userReducer
    }),
    {},
    applyMiddleware(thunk)
);
