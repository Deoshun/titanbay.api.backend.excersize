export class CreateInvestmentDto {
  investor_id: string;
  fund_id: string;
  amount_usd: number;
  investment_date: string;

  constructor(body: any) {
    this.investor_id = body.investor_id;
    this.fund_id = body.fund_id;
    this.amount_usd = body.amount_usd;
    this.investment_date = body.investment_date;
  }

  toPrisma() {
    return {
      investorId: this.investor_id,
      fundId: this.fund_id,
      amountUsd: this.amount_usd,
      investmentDate: new Date(this.investment_date)
    };
  }
}

