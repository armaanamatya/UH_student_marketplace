import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const alex = await prisma.user.upsert({
        where: { email: 'alex@cougarnet.uh.edu'},
        update: {},
        create: {
            email: 'alex@cougarnet.uh.edu',
            name: 'alex',
            hashedPassword: 'password'
        }
    })
    console.log({alex})
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })