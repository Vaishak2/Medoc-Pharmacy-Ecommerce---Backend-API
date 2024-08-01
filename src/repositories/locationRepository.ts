import { getRepository } from 'typeorm';
import { Location } from '../models/locationModel';

export const findAllLocations = async () => {
  return await getRepository(Location).find();
};

export const findLocationById = async (id: number) => {
  return await getRepository(Location).findOne({ where: { id } });
};

export const createLocation = async (locationData: Partial<Location>) => {
  const locationRepository = getRepository(Location);
  const location = locationRepository.create(locationData);
  return await locationRepository.save(location);
};
