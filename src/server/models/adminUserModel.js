'use strict';

import Mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = Mongoose.Schema;

var validateLocalStrategyPassword = function (password) {
    return (password && password.length > 6);
};

const AdminUserSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        default: ''
    },
    username: {
        type: String,
        unique: 'username should be unique',
        required: 'Please fill username!',
        trim: true
    },
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer'],
        trim: true
    }
});

AdminUserSchema.pre('save', function (next) {
    if (this.password && this.password.length > 6) {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

AdminUserSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
};

Mongoose.model('adminUser', AdminUserSchema);