import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (optional - comment out if you want to preserve data)
  await prisma.investment.deleteMany();
  await prisma.investor.deleteMany();
  await prisma.fund.deleteMany();

  // Create Funds
  const fund1 = await prisma.fund.create({
    data: {
      name: 'Titanbay Growth Fund I',
      vintageYear: 2024,
      targetSizeUsd: 250000000,
      status: 'Fundraising',
    },
  });

  const fund2 = await prisma.fund.create({
    data: {
      name: 'Titanbay Growth Fund II',
      vintageYear: 2025,
      targetSizeUsd: 500000000,
      status: 'Fundraising',
    },
  });

  const fund3 = await prisma.fund.create({
    data: {
      name: 'Titanbay Venture Fund I',
      vintageYear: 2023,
      targetSizeUsd: 100000000,
      status: 'Investing',
    },
  });

  console.log('✓ Created funds');

  // Create Investors
  const investor1 = await prisma.investor.create({
    data: {
      name: 'Goldman Sachs Asset Management',
      investorType: 'Institution',
      email: 'investments@gsam.com',
    },
  });

  const investor2 = await prisma.investor.create({
    data: {
      name: 'CalPERS',
      investorType: 'Institution',
      email: 'privateequity@calpers.ca.gov',
    },
  });

  const investor3 = await prisma.investor.create({
    data: {
      name: 'John Smith',
      investorType: 'Individual',
      email: 'john.smith@example.com',
    },
  });

  const investor4 = await prisma.investor.create({
    data: {
      name: 'Gates Foundation',
      investorType: 'Family Office',
      email: 'investments@gatesfoundation.org',
    },
  });

  console.log('✓ Created investors');

  // Create Investments
  await prisma.investment.create({
    data: {
      investorId: investor1.id,
      fundId: fund1.id,
      amountUsd: 50000000,
      investmentDate: new Date('2024-03-15'),
    },
  });

  await prisma.investment.create({
    data: {
      investorId: investor2.id,
      fundId: fund2.id,
      amountUsd: 75000000,
      investmentDate: new Date('2024-06-20'),
    },
  });

  await prisma.investment.create({
    data: {
      investorId: investor1.id,
      fundId: fund3.id,
      amountUsd: 25000000,
      investmentDate: new Date('2023-08-10'),
    },
  });

  await prisma.investment.create({
    data: {
      investorId: investor3.id,
      fundId: fund1.id,
      amountUsd: 2000000,
      investmentDate: new Date('2024-04-01'),
    },
  });

  await prisma.investment.create({
    data: {
      investorId: investor4.id,
      fundId: fund2.id,
      amountUsd: 100000000,
      investmentDate: new Date('2024-07-15'),
    },
  });

  console.log('✓ Created investments');

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
