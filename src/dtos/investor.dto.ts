export class CreateInvestorDto {
  name: string;
  investor_type: string;
  email: string;

  constructor(body: any) {
    this.name = body.name;
    this.investor_type = body.investor_type;
    this.email = body.email;
  }

  toPrisma() {
    return {
      name: this.name,
      investorType: this.investor_type,
      email: this.email
    };
  }
}
