import { prisma } from '../index';
import { Investment } from '../entities/investment.entity';

export class InvestmentModel {
  static async findAll(): Promise<Investment[]> {
    const investments = await prisma.investment.findMany({
      include: { investor: true, fund: true }
    });
    return investments.map(investment => new Investment(investment));
  }

  static async create(data: {
    investorId: string;
    fundId: string;
    amountUsd: number;
    investmentDate: Date;
  }): Promise<Investment> {
    const investment = await prisma.investment.create({ data });
    return new Investment(investment);
  }
}
