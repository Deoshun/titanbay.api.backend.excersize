export class Money {
  private amount: number;

  constructor(amount: number | string) {
    if (typeof amount === 'string') {
      this.amount = parseFloat(amount);
    } else {
      this.amount = amount;
    }
  }

  toString(): string {
    return this.amount.toFixed(2);
  }

  toJSON(): string {
    return this.toString();
  }
}
