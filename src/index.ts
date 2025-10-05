import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fundRoutes from './routes/fund.routes';
import investorRoutes from './routes/investor.routes';
import investmentRoutes from './routes/investment.routes';

export const prisma = new PrismaClient();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/funds', fundRoutes);
app.use('/investors', investorRoutes);
app.use('/investments', investmentRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
