import {Router} from 'express';
import {getUser} from '../controllers/general.controllers.js';
const router = Router();


router.get('/user/:id',getUser);
export default router;