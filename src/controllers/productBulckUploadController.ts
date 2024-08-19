import { Request, Response } from 'express';
import { bulkUploadService } from '../services/productBulckUploadService';

export const bulkUploadController = async (req: Request, res: Response) => {
    try {
        // Check if req.file is defined
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        await bulkUploadService(filePath);
        res.status(200).json({ message: 'Bulk upload successful' });
    } catch (error) {
        res.status(500).json({ message: 'Bulk upload failed', error: (error as Error).message });
    }
};
