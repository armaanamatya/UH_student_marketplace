// Verification logic for when a user registers for an account
// Allows for the application to maintain restriction to only UH students/faculty to prevent fake uh emails from registering
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../prisma/prisma'

export const generateVerificationToken = async (email: string) => {
    // Create a random token
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 Hour

    // Check if the token already exists 
    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // Create a new verification token
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires: new Date(expires)
        }
    })

    return verificationToken;
}