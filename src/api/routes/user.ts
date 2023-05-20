import { Router } from 'express';
import { getCurrentUser } from '../handlers/user';
const router = Router();

router.get('/', getCurrentUser);

export default router;
