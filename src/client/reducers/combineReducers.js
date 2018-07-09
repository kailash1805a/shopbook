import { combineReducers } from 'redux';

import { users } from './userReducer';

const rootReducers = combineReducers({
    users
});

export default rootReducers;