import express from 'express';
import * as apiV1Controller from '../../controller/ApiV1Controller';
import { authentication, authorization } from '../../middleware/jwtAuth'

const router = express.Router();

router.post('/register', apiV1Controller.register);
router.post('/login', apiV1Controller.login);

router.get('/users', authentication, authorization, apiV1Controller.getAllUsers);
router.get('/users/:id', authentication, authorization, apiV1Controller.getUserById);
router.post('/users', authentication, authorization, apiV1Controller.createUser);
router.patch('/users/:id', authentication, authorization, apiV1Controller.updateUser);
router.delete('/users/:id', authentication, authorization, apiV1Controller.deleteUser);

//Group
router.get('/group-user/all', apiV1Controller.getAllGroupUser);

export default router;