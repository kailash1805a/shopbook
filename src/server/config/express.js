'use strict';

import Http from 'http';
import Express from 'express';
import BodyParser from 'body-parser';
import Compress from 'compression';
import MethodOverride from 'method-override';
import { Config, getGlobbedFiles } from './config';
import UserModel from '../models/UserModel';
import adminUserModel from '../models/adminUserModel';
import router from '../routes/mainRoutes';
import Path from 'path';

export default function (db) {

    const app = Express();
    app.use(BodyParser.urlencoded({
        extended: true
    }));
    app.use(BodyParser.json());
    app.use(MethodOverride());
    app.use(Express.static(Path.resolve('./dist')));
    app.use(function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'authorization,Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });


    app.use('/api', router);

    app.use(function (err, req, res, next) {
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).json('500', {
            error: err.stack
        });
    });

    return app;
}