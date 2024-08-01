// src/repositories/offerRepository.ts
import { getRepository } from 'typeorm';
import Offer from '../models/offerModel';

const createOffer = async (offerData: { name: string; image_url: string; discount: number }) => {
  const offerRepository = getRepository(Offer);
  const offer = offerRepository.create(offerData);
  await offerRepository.save(offer);
  return offer;
};

const getOffers = async () => {
  const offerRepository = getRepository(Offer);
  return await offerRepository.find();
};

export default { createOffer, getOffers };
