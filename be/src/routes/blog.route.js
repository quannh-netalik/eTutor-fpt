import express from 'express';
import multer from 'multer';

import { validateRequest, verifyToken } from '../middlewares/index.js';
import * as blogController from '../controllers/blog/blog.handler.js';
import * as blogValidator from '../controllers/blog/blog.validator.js';

const router = express.Router();
export default (prefix) => {
    prefix.use('/blogs', verifyToken, router);

    router.get('/:id', blogController.getBlog);
    router.get('/', blogController.listBlog);
    router.post('/',
        blogValidator.createBlog,
        validateRequest,
        blogController.createBlog,
    );
    router.put('/:id', blogController.updateBlog);
    router.delete('/:id', blogController.deleteBlog);

    router.get('/:id/files/:fileId', blogController.downloadBlogFile);
    router.delete('/:id/files/:fileId', blogController.removeBlogFile);

    router.post('/:id/bg-image',
        multer({}).single('bgImage'),
        blogController.uploadBlogBgImg
    );

    router.post('/:id/files',
        multer({}).array('files'),
        blogController.uploadBlogFile
    );
};
