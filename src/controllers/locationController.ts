import { Request, Response } from 'express';
import { findAllLocations, createLocation } from '../repositories/locationRepository';
import { getDistance } from '../utils/distanceCalculator';

export const getLocations = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query;
    const currentLatitude = parseFloat(latitude as string);
    const currentLongitude = parseFloat(longitude as string);

    const locations = await findAllLocations();

    const locationsWithDistance = locations.map(location => {
      const distance = getDistance(currentLatitude, currentLongitude, location.latitude, location.longitude);
      return { ...location, distance };
    });

    res.status(200).json({
        message : "Success",
        data : locationsWithDistance
         });  
        } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};

export const addLocation = async (req: Request, res: Response) => {
  try {
    const locationData = req.body;
    const newLocation = await createLocation(locationData);
    res.status(201).json({
        message : "Success",
        data : newLocation
         });
  } catch (error) {
    res.status(500).json({ message: 'Error adding location', error });
  }
};
