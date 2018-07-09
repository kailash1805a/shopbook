'use strict';

import Passport from 'passport';
import { userList, createUser, userLogin, userStatus, createAdminUser, adminUserList } from '../controllers/UserCtrl';

import express from 'express';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/register').post(createUser);
router.route('/adminregister').post(createAdminUser);
router.route('/').get(userList);
router.route('/adminusers').get(adminUserList);
router.route('/login').post(userLogin);
router.route('/status/:id').post(userStatus);

export default router;

