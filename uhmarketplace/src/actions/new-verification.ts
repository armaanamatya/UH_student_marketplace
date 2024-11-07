"use server"

import { prisma } from "../../prisma/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    console.log(existingToken);

    if(!existingToken) {
        return { error: "Invalid Token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return { error: "token has expired" }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) {
        return { error: "User not found" }
    }

    const userCheck = await prisma.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    console.log(userCheck);

    await prisma.verificationToken.delete({
        where: {
            id:existingToken.id
        }    
    })

    return { success: "Email Verified" }
}
