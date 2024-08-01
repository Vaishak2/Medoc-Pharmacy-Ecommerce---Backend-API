// src/routes/userRoutes.ts
import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
// import {userController.gr} from '../controllers/userController';

const router = Router();


router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
