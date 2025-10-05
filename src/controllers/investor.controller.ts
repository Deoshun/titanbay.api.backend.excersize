import { Request, Response } from 'express';
import { InvestorModel } from '../models/investor.model';
import { CreateInvestorDto } from '../dtos/investor.dto';

export class InvestorController {
  async getAll(req: Request, res: Response) {
    try {
      const investors = await InvestorModel.findAll();
      res.json(investors.map(i => i.toJSON()));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch investors' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto = new CreateInvestorDto(req.body);
      const investor = await InvestorModel.create(dto.toPrisma());
      console.log(investor);
      res.status(201).json(investor.toJSON());
    } catch (error) {
      res.status(500).json({ error: `${error} Failed to create investor` });
    }
  }
}

