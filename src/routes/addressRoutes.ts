import { Router } from 'express';
import { addAddressController, updateAddressController, getAddressController, deleteAddressController, selectAddressController, getAllAddressController } from '../controllers/addressController';

const router = Router();

router.post('/addresses', addAddressController);
router.put('/addresses/:addressId', updateAddressController);
router.get('/addresses/:userId', getAddressController);
router.delete('/addresses/:addressId', deleteAddressController);
router.get('/alladdress', getAllAddressController);
router.put('/addresses/select/:addressId', selectAddressController);

export default router;
