import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';
// POST request for the registration of a user. 

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password, name } = body;

        const existingUser = await prisma.user.findUnique({
            // making email lowercase to avoid case-sensitivity errors
            // specifically for resend email verification
            where: {email: email.toLowerCase() }
        })

        if(existingUser) {
            return NextResponse.json({ user: null, message: "User with this email already exists"}, {status: 409})
        }

        const hashPass = await hash(password, 10);

      
        if(email?.endsWith("@uh.edu") || email?.endsWith("@cougarnet.uh.edu")) {
            await prisma.user.create({
                data: {
                    email: email.toLowerCase(),
                    hashedPassword: hashPass,
                    name: name
                }
            })
        } else {
            return NextResponse.json({message: "This email is not a valid UH email"}, {status: 400})
        }

        // Generate a verification token
        const verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(email, verificationToken.token)
        
        return NextResponse.json(body);
    } catch (error) {
        return NextResponse.json(error);
    }
}