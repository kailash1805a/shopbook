'use strict';


import express from 'express';
import userRoute from './UserRoutes';
const router = express.Router(); // eslint-disable-line new-cap

router.use('/users',userRoute);

export default router;

