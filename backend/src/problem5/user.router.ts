import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.post('/', userController.createUserHandler);

router.get('/all', userController.getUsersHandler);
router.get('/:id', userController.getUserByIdHandler);

router.put('/:id', userController.updateUserByIdHandler);

router.delete('/:id', userController.deleteUserByIdHandler);

export default router;
