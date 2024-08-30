import { Request, Response } from 'express';
import { Address } from '../models/address';
import { IAddressData } from '../types/IAddressData'
import { addAddressService, updateAddressService, getAddressesByUserIdService, deleteAddressService, selectAddressService, getAllAddress } from '../services/addressService';



export const addAddressController = async (req: Request, res: Response) => {
    try {
        const address = await addAddressService(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};


export const getAddressesByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const addresses = await getAddressesByUserIdService(userId);
    res.status(200).json({
      message : "Success",
      data :  addresses
    });
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

export const updateAddressController = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.addressId, 10); // Assuming addressId is part of the route params
  const addressData = req.body

  try {
      const updatedAddress = await updateAddressService(addressId, addressData);
      res.status(200).json(updatedAddress);
  } catch (error) {
      console.error('Error in updateAddressController:', error);
      res.status(500).json({ message: 'Failed to update address' });
  }
};


export const getAddressController = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const addresses = await getAddressesByUserIdService(userId);
      res.status(200).json({
        message : "Success",
        data :  addresses
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };


  export const deleteAddressController = async (req: Request, res: Response) => {
    const addressId = parseInt(req.params.addressId, 10);

    try {
        await deleteAddressService(addressId);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error in deleteAddressController:', error);
        res.status(500).json({ message: 'Failed to delete address' });
    }
};

export const selectAddressController = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.addressId, 10);
  const { userId } = req.body;

  if (!userId) {
      return res.status(400).json({ message: 'userId is required' });   
  }

  try {
      const selectedAddress = await selectAddressService(userId, addressId);
      res.status(200).json(selectedAddress);
  } catch (error) {
      console.error('Error in selectAddressController:', error);
      res.status(500).json({ message: 'Failed to select address' });
  }
};


export const getAllAddressController = async (req: Request, res: Response) => {
    try {
      const address = await getAllAddress();
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
 };

