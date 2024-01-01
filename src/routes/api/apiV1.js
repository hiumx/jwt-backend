import express from 'express';
import * as apiV1Controller from '../../controller/ApiV1Controller'
const router = express.Router();



router.get('/api-test', apiV1Controller.getApiTest);
router.post('/create', apiV1Controller.create);


export default router;