// src/controllers/bannerController.ts
import { Request, Response } from 'express';
import bannerService from '../services/bannerService';

const getBannerUrls = async (req: Request, res: Response) => {
  try {
    const banners = await bannerService.getBannerUrls();
    res.status(200).json({
      message:"Success",
      home : banners,
      productListPage : banners
  });
  } catch (error) {
    res.status(500).json({ 
      massage:false,
      message: (error as Error).message 
    });
  }
};

const addBanner = async (req: Request, res: Response) => {
  try {
    const { banner_imageurl } = req.body;
    if (!banner_imageurl) {
      return res.status(400).json({ message: 'banner_imageurl is required' });
    }
    const newBanner = await bannerService.addBanner(banner_imageurl);
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export { getBannerUrls, addBanner };
