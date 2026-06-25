import express from 'express';
import { createUrlController, getUrlController } from '../controllers/urlController.js';

const router = express.Router();

router.post('/api/url/shorten', createUrlController);
router.get('/:shortUrlCode', getUrlController);

export default router;