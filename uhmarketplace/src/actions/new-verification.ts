"use server"

// This function is running on the serverside to 
import { prisma } from "../../prisma/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

// token is passed in from verify-email-form.tsx
export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    // Check if the token exists at all 
    if(!existingToken) {
        return { error: "Invalid Token" }
    }

    // check if the token has expired based on the date. Should only be valid for an hour
    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return { error: "token has expired" }
    }

    // check email from the token model data and see if the user exists to verify 
    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) {
        return { error: "User not found" }
    }

    // Update the user with their new email verified date.
    await prisma.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    // Delete the verification token after verification
    await prisma.verificationToken.delete({
        where: {
            id:existingToken.id
        }    
    })

    return { success: "Email Verified" }
}
