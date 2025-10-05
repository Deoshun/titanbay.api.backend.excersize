export class Investor {
  id: string;
  name: string;
  investorType: string;
  email: string;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.investorType = data.investorType;
    this.email = data.email;
    this.createdAt = new Date(data.createdAt);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      investor_type: this.investorType,
      email: this.email,
      created_at: this.createdAt.toISOString()
    };
  }
}
