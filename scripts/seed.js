import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.deal.createMany({
    data: [
      {
        caption: "50% off pizza",
        url: "https://www.instagram.com/reel/DNOEvdKxH1y/",
        startsAt: new Date("2025-12-01T00:00:00Z"),
        endsAt: new Date("2025-12-10T23:59:59Z"),
      },
      {
        caption: "BOGO Bubble Tea",
        url: "https://www.instagram.com/reel/DKkwh_ihZvA/",
        startsAt: new Date("2025-12-05T00:00:00Z"),
        endsAt: new Date("2025-12-15T23:59:59Z"),
      },
    ],
  });
  console.log('Seed data inserted!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
