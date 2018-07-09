'user strict';

import Mongoose from 'mongoose';
import { Config } from '../config/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const User = Mongoose.model('User');
const adminUser = Mongoose.model('adminUser');

function errorHandler(response, reason, message, code) {
    console.log("ERROR: ", reason);
    response.status(code || 500).json({
        'error': message
    });
}



/**
 * create new user
 * @param {*} req 
 * @param {*} res 
 */
export const createUser = (req, res) => {
    console.log("create user", req.body);
    const user = new User(req.body);

    user.provider = 'customer';
    user.save(function (err) {
        if (err) {
            errorHandler(res, err.message, 'Error in user saving', 500);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            res.json(user);
        }
    });
};

/**
 * create new admin user
 * @param {*} req 
 * @param {*} res 
 */
export const createAdminUser = (req, res) => {
    console.log("create admin user", req.body);
    const user = new adminUser(req.body);
    user.provider = 'customer';
    user.save(function (err) {
        if (err) {
            errorHandler(res, err.message, 'Error in user saving', 500);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            res.json(user);
        }
    });
};

/**
 * user list
 */
export const userList = (req, res) => {
    User.find({}, function (err, users) {
        if (err) return res.status(500).json('Error on the server.');
        res.json(users);
    });
}

/**
 * user list
 */
export const adminUserList = (req, res) => {
    adminUser.find({}, function (err, users) {
        if (err) return res.status(500).json('Error on the server.');
        res.json(users);
    });
}

/**
 * login user
 */
export const userLogin = (req, res) => {
    User.findOne({ mobileno: req.body.mobileno }, function (err, user) {
        if (err) return res.status(500).json('Error on the server!');
        if (!user) return res.status(200).json('Invalid user!');
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).json('Invalid username and password!');

        let userPayload = { user: user };
        let token = jwt.sign(userPayload, Config.secret);
        res.json({ auth: true, token: token });
    });
}

/**
 * Disable user
 */
export const userStatus = (req, res) => {
    const userId = req.params.id;
    User.findOne({ _id: userId }, function (err, user) {
        if (err) return res.status(500).json('Error on the server.');
        if (!user) return res.status(404).json('No user found.');
        user.isActive = req.body.isActive;
        user.save(function (err) {
            if (err) {
                errorHandler(res, err.message, 'Error while changing password', 500);
            } else {
                res.json('User status updated successfully!');
            }
        })
    });
}
