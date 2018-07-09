'use strict';

import Mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = Mongoose.Schema;

var validateLocalStrategyPassword = function (password) {
    return (password && password.length > 6);
};

const UserSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        default: ''
    },
    mobileno: {
        type: Number,
        unique: 'mobileno should be unique',
        required: 'Please fill in a mobileNo!',
        trim: true
    },
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    emailId: {
        type: String,
        required: 'Please fill in a emailId',
        trim: true
    },
    roles: {
        type: [{
            type: String,
            enum: ['customer', 'servicemen']
        }],
        default: ['customer']
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

UserSchema.pre('save', function (next) {
    if (this.password && this.password.length > 6) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

UserSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
};

Mongoose.model('User', UserSchema);