import { prisma } from '../index';
import { Fund } from '../entities/fund.entity';

export class FundModel {
  static async findAll(): Promise<Fund[]> {
    const funds = await prisma.fund.findMany();
    return funds.map(fund => new Fund(fund));
  }

  static async findById(id: string): Promise<Fund | null> {
    const fund = await prisma.fund.findUnique({ where: { id } });
    return fund ? new Fund(fund) : null;
  }

  static async create(data: {
    name: string;
    vintageYear: number;
    targetSizeUsd: number;
    status: string;
  }): Promise<Fund> {
    const fund = await prisma.fund.create({ data });
    return new Fund(fund);
  }

  static async update(id: string, data: {
    name?: string;
    vintageYear?: number;
    targetSizeUsd?: number;
    status?: string;
  }): Promise<Fund> {
    const fund = await prisma.fund.update({
      where: { id },
      data,
    });
    return new Fund(fund);
  }
}
