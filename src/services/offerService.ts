import { getRepository } from 'typeorm';
import Offer from '../models/offerModel';

export const getAvailableOffersByUserId = async (userId: number) => {
    const offerRepository = getRepository(Offer);

    const offers = await offerRepository.find({
      where: { user: { id: userId }, isActive: true },
      order: { expirationDate: 'ASC' }
    });
  
    return offers.map(offer => ({
      offerCode: offer.offerCode,
      description: offer.description,
      discount: offer.discount,
      expirationDate: offer.expirationDate,
    }));
};
