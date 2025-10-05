import { prisma } from '../index';
import { Investor } from '../entities/investor.entity';

export class InvestorModel {
  static async findAll(): Promise<Investor[]> {
    const investors = await prisma.investor.findMany();
    return investors.map(investor => new Investor(investor));
  }

  static async create(data: {
    name: string;
    investorType: string;
    email: string;
  }): Promise<Investor> {
    const investor = await prisma.investor.create({ data });
    return new Investor(investor);
  }
}
