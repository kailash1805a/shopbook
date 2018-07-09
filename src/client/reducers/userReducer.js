import { userConstants } from '../constants/userConstants';

export function users(state= {}, action) {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST: 
        return {
            loading: true
        };

        case userConstants.USER_REGISTER_SUCCESS: 
        return {
            item: action.userObj
        }

        case userConstants.USER_REGISTER_FAILURE:
        return {
            item: action.error
        }
    
        default: 
            return state;
    }
}