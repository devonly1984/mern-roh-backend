import {Router} from 'express';
import {getDashboardStats, getUser} from '../controllers/general.controllers.js';
const router = Router();


router.get('/user/:id',getUser);
router.get('/dashboard',getDashboardStats);
export default router;