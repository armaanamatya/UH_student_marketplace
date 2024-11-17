// Example: /pages/api/auth/forgot-password.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/prisma";  // Import your Prisma instance for database interaction
import { sendPasswordResetEmail } from "../../../lib/email";  // Assuming you have an email utility
import { generateResetToken } from "../../../lib/generateResetToken";  // Import the function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a password reset token (you may want to use JWT or a random token)
        const resetToken = generateResetToken(user.email); 

        // Save the token in the database with an expiration time (optional)
        await prisma.passwordReset.create({
            data: {
                userId: user.id,
                token: resetToken,
                expiresAt: new Date(Date.now() + 3600000),  // 1 hour expiration time
            },
        });

        // Send reset link via email (implement the email logic)
        await sendPasswordResetEmail(user.email, resetToken);

        return res.status(200).json({ message: "Password reset link sent to your email" });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
