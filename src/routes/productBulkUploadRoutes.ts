import express from 'express';
import { bulkUploadController } from '../controllers/productBulckUploadController';
import upload from '../middlewares/multerMiddleware';

const router = express.Router();

router.post('/bulk-upload', upload.single('file'), bulkUploadController);

export default router;
