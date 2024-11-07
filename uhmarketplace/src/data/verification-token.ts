import {prisma} from '../../prisma/prisma'
// Verification token queries
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const emailVerificationToken = await prisma.verificationToken.findFirst({
            where: {
                email: email
            }
        })

        return emailVerificationToken;
    } catch (error) {   
        console.log(error);
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                token: token
            }
        })

        return verificationToken;
    } catch (error) {
        console.log(error);
    }
}