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

## API Endpoints

### Funds
- `GET /funds` - List all funds
- `GET /funds/{id}` - Get a specific fund
- `POST /funds` - Create a new fund
- `PUT /funds` - Update an existing fund (ID in body)

### Investors
- `GET /investors` - List all investors
- `POST /investors` - Create a new investor

### Investments
- `GET /investments` - List all investments
- `POST /investments` - Create a new investment

Specifications: https://storage.googleapis.com/interview-api-doc-funds.wearebusy.engineering/index.html

## Architecture

- **Controllers**: Handle HTTP requests and responses
- **Models**: Contain database interaction (Prisma)
- **Routes**: Define API endpoints
- **Entities**: Define TS DataModels
