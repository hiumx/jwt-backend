import express from 'express';
import * as userController from '../../controller/UserController';

const router = express.Router();

router.get('/create', userController.create);
router.post('/create', userController.store);
router.get('/manager', userController.manager);

export default router;