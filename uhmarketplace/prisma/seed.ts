import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hash } from 'bcrypt'

async function main() {
    const password = "password";
    const hashPass = await hash(password, 10);

    const alex = await prisma.user.upsert({
        where: { email: 'alex@uh.edu'},
        update: {},
        create: {
            email: 'alex@uh.edu',
            name: 'alex',
            hashedPassword: hashPass,
            posts: {
                create: [{
                    title: "Big Cougars",
                    description: "I am selling big cougars. Please buy",
                    imageUrl: "https://plus.unsplash.com/premium_photo-1664304244899-60b0a629ade1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }]
            }
        }
    })

    const joseph = await prisma.user.upsert({
        where: { email: 'joseph@uh.edu'},
        update: {},
        create: {
            email: 'joseph@uh.edu',
            name: 'Joseph',
            hashedPassword: hashPass,
            posts: {
                create: [{
                    title: "Big Cougars 2",
                    description: "I am selling big cougars. Do not buy from Alex. Please buy",
                    imageUrl: "https://plus.unsplash.com/premium_photo-1664304244899-60b0a629ade1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }]
            }
        }
    })

    console.log({alex, joseph})
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