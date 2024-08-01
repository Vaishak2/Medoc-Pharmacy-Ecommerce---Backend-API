
import { getCustomRepository } from 'typeorm';
import { addAddress, updateAddress, getAddressesByUserId, deleteAddress, selectAddress, getAllAddresses} from '../repositories/addressRepository';
import { Address } from '../models/address';
import { IAddressData } from '../types/IAddressData'


export const addAddressService = async (addressData: IAddressData): Promise<Address> => {
  return await addAddress(addressData);
};

export const updateAddressService = async (addressId: number, addressData: IAddressData): Promise<Address> => {
  return await updateAddress(addressId, addressData)
}

export const getAddressesByUserIdService = async (userId: number) => {
  return await getAddressesByUserId(userId);
};

export const deleteAddressService = async (addressId: number): Promise<void> => {
  await deleteAddress(addressId);
};

export const selectAddressService = async (userId: number, addressId: number): Promise<Address> => {
  return await selectAddress(userId, addressId);
};


export const getAllAddress = async () => {
  return await getAllAddresses();
};





