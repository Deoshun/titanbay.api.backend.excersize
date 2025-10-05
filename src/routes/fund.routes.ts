import { Router } from 'express';
import { FundController } from '../controllers/fund.controller';

const router = Router();
const controller = new FundController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/', controller.update);
//router.delete('/:id', controller.delete);

export default router;
