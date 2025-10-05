import { Request, Response } from 'express';
import { FundModel } from '../models/fund.model';
import { CreateFundDto, UpdateFundDto } from '../dtos/fund.dto';

export class FundController {
  async getAll(req: Request, res: Response) {
    try {
      const funds = await FundModel.findAll();
      res.json(funds.map(f => f.toJSON()));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch funds' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fund = await FundModel.findById(id);
      
      if (!fund) {
        return res.status(404).json({ error: 'Fund not found' });
      }
      
      res.json(fund.toJSON());
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch fund' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto = new CreateFundDto(req.body);
      const fund = await FundModel.create(dto.toPrisma());
      res.status(201).json(fund.toJSON());
    } catch (error) {
      res.status(500).json({ error: 'Failed to create fund' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto = new UpdateFundDto(req.body);
      
      if (!dto.id) {
        return res.status(400).json({ error: 'Fund ID is required in request body' });
      }

      const fund = await FundModel.update(dto.id, dto.toPrisma());
      res.json(fund.toJSON());
    } catch (error) {
      res.status(500).json({ error: 'Failed to update fund' });
    }
  }
}

