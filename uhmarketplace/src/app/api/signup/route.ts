import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
// POST request for the registration of a user. 

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password, name } = body;

        const existingUser = await prisma.user.findUnique({
            where: {email: email }
        })

        if(existingUser) {
            return NextResponse.json({ user: null, message: "User with this email already exists"}, {status: 409})
        }

        // This could be abused if the user decides to create an account even if the email did not exist. I will add an email verification system to filter that out. - Alex
        const hashPass = await hash(password, 10);

        if(email?.endsWith("@uh.edu")) {
            await prisma.user.create({
                data: {
                    email: email,
                    hashedPassword: hashPass,
                    name: name
                }
            })
        } else {
            return NextResponse.json({message: "This email is not a valid UH email"}, {status: 400})
        }
        
        return NextResponse.json(body);
    } catch (error) {
        return NextResponse.json(error);
    }
}