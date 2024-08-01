import { Request, Response } from 'express';
import { getRecentlyViewedByUser } from '../services/recentlyViewedService';

export const getRecentlyViewedController = async (req: Request, res: Response) => {
  try {
    const { searchKeyWord } = req.params;
    const { userId, pageNumber, pageSize } = req.query;

    const page = parseInt(pageNumber as string) || 1;
    const size = parseInt(pageSize as string) || 10;

    const result = await getRecentlyViewedByUser(parseInt(userId as string), searchKeyWord, page, size);

    res.json({
      message: 'Success',
      data:{ products:  result.data},
      total: result.total,
      pageNumber: result.pageNumber,
      pageSize: result.pageSize
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching recently viewed products',
      error
    });
  }
};
