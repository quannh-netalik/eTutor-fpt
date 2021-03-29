import express from 'express';
import userRoute from './user.route.js';
import facultyRoute from './faculty.route.js';
import termRoute from './term.route.js';
import blogRoute from './blog.route.js';
import commentRoute from './comment.route.js';
import reportRoute from './report.route.js';
import messageRoute from './message.route.js';

import { validateRequest } from '../middlewares/index.js';
import * as userValidator from '../controllers/user/user.validator.js';
import * as userController from '../controllers/user/user.handler.js';

const router = express.Router();
export default (app) => {
    app.use('/api', router);

    router.get('/', (_req, res) => res.send('Welcome to eTutor system...'));

    // authentication
    router.post('/login', userValidator.login, validateRequest, userController.login);

    // routing to /users
    userRoute(router);

    // routing to /faculty
    facultyRoute(router);

    // routing to /termRoute
    termRoute(router);

    // routing to /blog
    blogRoute(router);

    // routing to /comment
    commentRoute(router);

    // routing to report
    reportRoute(router);

    // routing to message
    messageRoute(router);
};
