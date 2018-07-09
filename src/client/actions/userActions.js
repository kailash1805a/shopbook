import { userConstants } from './../constants/userConstants';
import { userServices } from './../services/userServices';
import { history } from './../helpers/history';

export const userActions = {
    userRegister,
    userLogin
};

/**
 * user login
 */
function userLogin(username, password) {
    return dispatch => {
        userServices.login(username, password)
            .then((user) => {
                dispatch(userConstants.USER_LOGIN_SUCCESS, user);
            },
            error => {
                dispatch(userConstants.USER_LOGIN_FAILURE, error);
            });
    }
}

/**
 * user register
 */
function userRegister(user) {
    return dispatch => {
        userServices.register(user)
            .then((user) => {
                // const userObj = { 'fullname': user.fullname, 'username': user.username, '_id': user._id };
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(userConstants.USER_REGISTER_FAILURE, error);
            });
    }

    function success(user) { return { type: userConstants.USER_REGISTER_SUCCESS, user } }
}