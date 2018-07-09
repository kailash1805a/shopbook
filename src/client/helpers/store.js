import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducers from './../reducers/combineReducers';

export const store = createStore(
    rootReducers,
    applyMiddleware(
        thunkMiddleware
    )
);