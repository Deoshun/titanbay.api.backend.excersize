# titanbay.api.backend.excersize
# Fund API

TypeScript + Express + Prisma REST API

## Setup

0. Start Database `docker compose up -d`
1. Update `.env` with your database URL
2. Install dependencies: `npm install`
3. Run migrations: `npm run prisma:migrate`
4. Generate Prisma client: `npm run prisma:generate`
5. Start dev server: `npm run dev`
6. Run intergration tests: `npm test`

## API Endpoints

### Funds
- `GET /funds` - List all funds
- `GET /funds/{id}` - Get a specific fund
- `POST /funds` - Create a new fund
- `PUT /funds` - Update an existing fund

### Investors
- `GET /investors` - List all investors
- `POST /investors` - Create a new investor

### Investments
- `GET /funds/{fund_id}/investments` - Get all investments for a specific fund
- `POST /funds/{fund_id}/investments` - Create investment for a specific fund

Specifications: https://storage.googleapis.com/interview-api-doc-funds.wearebusy.engineering/index.html

### Create a Fund
```bash
curl -X POST http://localhost:3000/funds \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Titanbay Growth Fund I",
    "vintage_year": 2024,
    "target_size_usd": 250000000,
    "status": "Fundraising"
  }'
```

### Create an Investor
```bash
curl -X POST http://localhost:3000/investors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Goldman Sachs Asset Management",
    "investor_type": "Institution",
    "email": "investments@gsam.com"
  }'
```

### Create an Investment (Nested Route)
```bash
curl -X POST http://localhost:3000/funds/{fund_id}/investments \
  -H "Content-Type: application/json" \
  -d '{
    "investor_id": "{investor_id}",
    "amount_usd": 5000000,
    "investment_date": "2024-06-15"
  }'
```

## Project Setup

```
src/
├── controllers/    # HTTP request handlers
├── models/         # Database interactions (Prisma)
├── entities/       # Domain objects with business logic
├── dtos/           # Data Transfer Objects (API ↔ Domain mapping)
├── types/          # Custom types (Money, etc.)
└── routes/         # API endpoint definitions
```
