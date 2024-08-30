import { AppDataSource } from '../database/dataSource';
import { Address } from '../models/address';
import { IAddressData } from '../types/IAddressData'

import { getRepository, In } from 'typeorm';

const addressRepository = AppDataSource.getRepository(Address);


// Function to add a new address
export const addAddress = async (addressData: IAddressData): Promise<Address> => {
  try {
    // Get the address repository
    const addressRepository = getRepository(Address);
    
    // Create a new address entity with the provided data
    const address = addressRepository.create(addressData);
    
    // Save the address to the database
    await addressRepository.save(address);
    
    // Return the saved address
    return address;
  } catch (error) {
    // Log the error and throw a new error
    console.error('Error adding address:', error);
    throw new Error('Failed to add address');
  }
}

export const updateAddress = async (addressId: number, addressData: IAddressData): Promise<Address> => {
  const addressRepository = getRepository(Address);
    const existingAddress = await addressRepository.findOne({ where: { id: addressId } });

    if (!existingAddress) {
        throw new Error(`Address with ID ${addressId} not found`);
    }

    const updatedAddress = {
        ...existingAddress,
        ...addressData,
    };

    await addressRepository.save(updatedAddress);
    return updatedAddress;
}


export const getAddressesByUserId = async (userId: number) => {
  const addressRepository = getRepository(Address);

  return await addressRepository.find({
    where: {
      userId,
      isDeleted: In([false, null]), // In case `isDelete` can be true or null
    },
  });
};

export const deleteAddress = async (addressId: number): Promise<void> => {
  try {
    // Find the existing address by ID
    const existingAddress = await addressRepository.findOne({ where: { id: addressId } });

    // If the address doesn't exist, throw an error
    if (!existingAddress) {
      throw new Error(`Address with ID ${addressId} not found`);
    }

    // Set the `isDelete` field to `false` instead of deleting the record
    existingAddress.isDeleted = true;

    // Save the updated address record
    await addressRepository.save(existingAddress);

  } catch (error) {
    console.error('Error marking address as deleted:', error);
    throw new Error('Failed to mark address as deleted');
  }
};

export const selectAddress = async (userId: number, addressId: number): Promise<Address> => {
  try {
    // Deselect all addresses for the user
    await addressRepository.update({ userId }, { isselected: false });

    // Select the specified address
    await addressRepository.update({ id: addressId, userId }, { isselected: true });

    const selectedAddress = await addressRepository.findOne({ where: { id: addressId, userId } });

    if (!selectedAddress) {
      throw new Error(`Address with ID ${addressId} not found`);
    }

    return selectedAddress;
  } catch (error) {
    console.error('Error selecting address:', error);
    throw new Error('Failed to select address');
  }
};


export const getAllAddresses = async () => {
  const addressRepository = getRepository(Address);
  return await addressRepository.find();
};

