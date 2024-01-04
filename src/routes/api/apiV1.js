import express from 'express';
import * as apiV1Controller from '../../controller/ApiV1Controller'
const router = express.Router();

router.post('/register', apiV1Controller.register);
router.post('/login', apiV1Controller.login);

router.get('/users/get-all', apiV1Controller.getAllUsers)
router.post('/users', apiV1Controller.createUser)
router.put('/users/update/', apiV1Controller.updateUser)
router.delete('/users/delete/', apiV1Controller.deleteUser)

//Group
router.get('/group-user/all', apiV1Controller.getAllGroupUser)



export default router;