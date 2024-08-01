// src/controllers/offerController.ts
import { Request, Response } from 'express';
import offerRepository from '../repositories/offerRepository';
import { getAvailableOffersByUserId } from '../services/offerService';

const getOffers = async (req: Request, res: Response) => {
  try {
    const offers = await offerRepository.getOffers();
    res.status(200).json({
      message : "Success",
      data : offers
    });
  } catch (err) {
    res.status(500).json({ 
      message : false,
      error: (err as Error).message
     });
  }
};

const createOffer = async (req: Request, res: Response) => {
  const { name, image_url, discount } = req.body;

  try {
    const newOffer = await offerRepository.createOffer({ name, image_url, discount });
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getOffersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const offers = await getAvailableOffersByUserId(parseInt(userId));

    if (!offers) {
      return res.status(404).json({ message: 'No offers found for the user' });
    }

    res.status(200).json({ message: 'Success', offers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offers', error });
  }
};

export default { getOffers, createOffer };
