'use strict';

import { Config } from './config/config';
import Mongoose from 'mongoose';
import Express from './config/express';
import BodyParser from 'body-parser';
import http from 'http';
import _ from 'lodash';
import Passport from './config/passport';
import path from 'path';

Mongoose.connect(Config.db);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log("connected!");
});

// Init the express application
const app = Express(db);

app.listen(Config.port);

console.log('Smart Home application started on port ' + Config.port);