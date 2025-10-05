import { Money } from '../types/Money';

export class Investment {
  id: string;
  investorId: string;
  fundId: string;
  amountUsd: Money;
  investmentDate: Date;
  investor?: any;
  fund?: any;

  constructor(data: any) {
    this.id = data.id;
    this.investorId = data.investorId;
    this.fundId = data.fundId;
    this.amountUsd = new Money(data.amountUsd);
    this.investmentDate = new Date(data.investmentDate);
    this.investor = data.investor;
    this.fund = data.fund;
  }

  toJSON() {
    return {
      id: this.id,
      investor_id: this.investorId,
      fund_id: this.fundId,
      amount_usd: this.amountUsd.toString(),
      investment_date: this.investmentDate.toISOString().split('T')[0],
      ...(this.investor && { investor: this.investor }),
      ...(this.fund && { fund: this.fund })
    };
  }
}
