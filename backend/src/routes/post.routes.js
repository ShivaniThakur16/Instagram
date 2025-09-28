import express from 'express';

import { createpostcontroller , getPostsController } from '../controllers/post.controller.js';
import { getpostsValidator } from '../middlewares/validator.middleware.js';
import multer from 'multer';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router()

const upload = multer({storage:multer.memoryStorage()});

router.post('/',authMiddleware,upload.single("image"),createpostcontroller)

router.get('/', getpostsValidator, authMiddleware, getPostsController);

export default router;

