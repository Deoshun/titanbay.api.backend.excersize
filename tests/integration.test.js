import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://localhost:3000';

// Generate unique email with timestamp and random string
function generateEmail() {
  return `test${Date.now()}${Math.random().toString(36).substring(7)}@example.com`;
}

async function request(method, path, body = null) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null
  });

  const data = response.headers.get('content-type')?.includes('application/json')
    ? await response.json()
    : null;

  return { status: response.status, data };
}

let fundId;
let investorId;

describe('Fund API Integration Tests', () => {
  
  describe('Funds', () => {
    it('should create a new fund', async () => {
      const response = await request('POST', '/funds', {
        name: 'Test Fund',
        vintage_year: 2024,
        target_size_usd: 100000000,
        status: 'Fundraising'
      });

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.name).toBe('Test Fund');
      expect(response.data.vintage_year).toBe(2024);
      expect(response.data.target_size_usd).toBe('100000000.00');
      expect(response.data.status).toBe('Fundraising');

      fundId = response.data.id;
    });

    it('should get all funds', async () => {
      const response = await request('GET', '/funds');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
    });

    it('should get fund by ID', async () => {
      const response = await request('GET', `/funds/${fundId}`);

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(fundId);
      expect(response.data.name).toBe('Test Fund');
      expect(response.data.vintage_year).toBe(2024);
    });

    it('should update a fund', async () => {
      const response = await request('PUT', '/funds', {
        id: fundId,
        status: 'Investing',
        target_size_usd: 150000000
      });

      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Investing');
      expect(response.data.target_size_usd).toBe('150000000.00');
    });

    it('should verify fund update persisted', async () => {
      const response = await request('GET', `/funds/${fundId}`);

      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Investing');
      expect(response.data.target_size_usd).toBe('150000000.00');
    });

    it('should return 404 for invalid fund ID', async () => {
      const response = await request('GET', '/funds/00000000-0000-0000-0000-000000000000');

      expect(response.status).toBe(404);
    });

    it('should return 400 when updating without ID', async () => {
      const response = await request('PUT', '/funds', {
        status: 'Closed'
      });

      expect(response.status).toBe(400);
    });
  });

  describe('Investors', () => {
    it('should create a new investor', async () => {
      const response = await request('POST', '/investors', {
        name: 'Test Investor',
        investor_type: 'Institution',
        email: generateEmail()
      });

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.name).toBe('Test Investor');
      expect(response.data.investor_type).toBe('Institution');

      investorId = response.data.id;
    });

    it('should get all investors', async () => {
      const response = await request('GET', '/investors');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
    });
  });

  describe('Investments', () => {
    it('should create investment via nested fund route', async () => {
      const response = await request('POST', `/funds/${fundId}/investments`, {
        investor_id: investorId,
        amount_usd: 5000000,
        investment_date: '2024-06-15'
      });

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.investor_id).toBe(investorId);
      expect(response.data.fund_id).toBe(fundId);
      expect(response.data.amount_usd).toBe('5000000.00');
      expect(response.data.investment_date).toBe('2024-06-15');
    });

    it('should get all investments for a fund', async () => {
      const response = await request('GET', `/funds/${fundId}/investments`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
      expect(response.data[0]).toHaveProperty('investor');
      expect(response.data[0]).toHaveProperty('fund');
    });


    it('should return 404 when creating investment for non-existent fund', async () => {
      const response = await request('POST', '/funds/00000000-0000-0000-0000-000000000000/investments', {
        investor_id: investorId,
        amount_usd: 1000000,
        investment_date: '2024-08-01'
      });

      expect(response.status).toBe(404);
    });
  });
});
