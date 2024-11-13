import { PrismaClient } from '@prisma/client';

// Create a new PrismaClient instance
const prisma = new PrismaClient();

export async function connect() {
  try {
    // Test the database connection by calling a simple query (can be a fetch or simple check)
    await prisma.$connect();

    console.log('Connected to MySQL database successfully');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  } finally {
    // Disconnect Prisma when done (optional for certain operations, can be kept)
    await prisma.$disconnect();
  }
}
