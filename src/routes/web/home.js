import express from 'express';
import * as homeController from '../../controller/HomeController';

const router = express.Router();

router.get('/', homeController.home);

export default router;