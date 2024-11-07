import {prisma} from '../../prisma/prisma'

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