import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer, toastReducer, userReducer} from './reducers'

export const store = createStore(
    combineReducers({
        auth:authReducer,
        user:userReducer,
        toast:toastReducer
    }),
    {},
    applyMiddleware(thunk)
);
