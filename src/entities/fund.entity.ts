import { Money } from '../types/Money';

export class Fund {
  id: string;
  name: string;
  vintageYear: number;
  targetSizeUsd: Money;
  status: string;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.vintageYear = data.vintageYear;
    this.targetSizeUsd = new Money(data.targetSizeUsd);
    this.status = data.status;
    this.createdAt = new Date(data.createdAt);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      vintage_year: this.vintageYear,
      target_size_usd: this.targetSizeUsd.toString(),
      status: this.status,
      created_at: this.createdAt.toISOString()
    };
  }
}
