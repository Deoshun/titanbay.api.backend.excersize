import { Router } from 'express';
import { InvestmentController } from '../controllers/investment.controller';

const router = Router();
const controller = new InvestmentController();

router.get('/', controller.getAll);
//router.get('/:id', controller.getById);
router.post('/', controller.create);
//router.put('/', controller.update);
//router.delete('/:id', controller.delete);

export default router;
