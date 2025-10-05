import { Request, Response } from 'express';
import { FundModel } from '../models/fund.model';
import { InvestmentModel } from '../models/investment.model';
import { CreateFundDto, UpdateFundDto } from '../dtos/fund.dto';
import { CreateInvestmentDto } from '../dtos/investment.dto';

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

  async getInvestments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Verify fund exists
      const fund = await FundModel.findById(id);
      if (!fund) {
        return res.status(404).json({ error: 'Fund not found' });
      }

      const investments = await InvestmentModel.findByFund(id);
      res.json(investments.map(i => i.toJSON()));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch investments' });
    }
  }

  async createInvestment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Verify fund exists
      const fund = await FundModel.findById(id);
      if (!fund) {
        return res.status(404).json({ error: 'Fund not found' });
      }

      // Create DTO with fund_id from URL
      const dto = new CreateInvestmentDto({
        ...req.body,
        fund_id: id  // Override/set fund_id from URL param
      });
      
      const investment = await InvestmentModel.create(dto.toPrisma());
      res.status(201).json(investment.toJSON());
    } catch (error) {
      res.status(500).json({ error: 'Failed to create investment' });
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
