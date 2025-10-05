import { Request, Response } from 'express';
import { InvestmentModel } from '../models/investment.model';
import { CreateInvestmentDto } from '../dtos/investment.dto';

export class InvestmentController {
  async getAll(req: Request, res: Response) {
    try {
      const investments = await InvestmentModel.findAll();
      res.json(investments.map(i => i.toJSON()));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch investments' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto = new CreateInvestmentDto(req.body);
      const investment = await InvestmentModel.create(dto.toPrisma());
      res.status(201).json(investment.toJSON());
    } catch (error) {
      res.status(500).json({ error: 'Failed to create investment' });
    }
  }
}
