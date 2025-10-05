export class CreateFundDto {
  name: string;
  vintage_year: number;
  target_size_usd: number;
  status: string;

  constructor(body: any) {
    this.name = body.name;
    this.vintage_year = body.vintage_year;
    this.target_size_usd = body.target_size_usd;
    this.status = body.status;
  }

  toPrisma() {
    return {
      name: this.name,
      vintageYear: this.vintage_year,
      targetSizeUsd: this.target_size_usd,
      status: this.status
    };
  }
}

export class UpdateFundDto {
  id: string;
  name?: string;
  vintage_year?: number;
  target_size_usd?: number;
  status?: string;

  constructor(body: any) {
    this.id = body.id;
    this.name = body.name;
    this.vintage_year = body.vintage_year;
    this.target_size_usd = body.target_size_usd;
    this.status = body.status;
  }

  toPrisma() {
    const data: any = {};
    if (this.name !== undefined) data.name = this.name;
    if (this.vintage_year !== undefined) data.vintageYear = this.vintage_year;
    if (this.target_size_usd !== undefined) data.targetSizeUsd = this.target_size_usd;
    if (this.status !== undefined) data.status = this.status;
    return data;
  }
}

