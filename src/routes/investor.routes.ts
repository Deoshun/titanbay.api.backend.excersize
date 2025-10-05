import { Router } from 'express';
import { InvestorController } from '../controllers/investor.controller';

const router = Router();
const controller = new InvestorController();

router.get('/', controller.getAll);
//router.get('/:id', controller.getById);
router.post('/', controller.create);
//router.put('/', controller.update);
//router.delete('/:id', controller.delete);

export default router;
