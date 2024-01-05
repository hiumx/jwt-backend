import express from 'express';
import * as apiV1Controller from '../../controller/ApiV1Controller';

const router = express.Router();

router.post('/register', apiV1Controller.register);
router.post('/login', apiV1Controller.login);

router.get('/users/get-all', apiV1Controller.getAllUsers);
router.get('/users/:id', apiV1Controller.getUserById);
router.post('/users', apiV1Controller.createUser);
router.patch('/users/:id', apiV1Controller.updateUser);
router.delete('/users/:id', apiV1Controller.deleteUser);

//Group
router.get('/group-user/all', apiV1Controller.getAllGroupUser);

export default router;