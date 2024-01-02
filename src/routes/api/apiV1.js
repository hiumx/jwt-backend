import express from 'express';
import * as apiV1Controller from '../../controller/ApiV1Controller'
const router = express.Router();

router.post('/create', apiV1Controller.create);
router.post('/login', apiV1Controller.login);



export default router;