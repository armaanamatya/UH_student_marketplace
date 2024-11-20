import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
import Email from "../components/emails/Email";
// This needs to use the future domain we plan to use
//
const domain = process.env.VERCEL_URL || "http://localhost:3000";

// This is the portion that will be sending the email to the user for verification
// A lot of this is subject to change for production
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/verify-email?token=${token}`;

    await resend.emails.send({
        from: "coogbay@coogbay.xyz",
        to: email,
        subject: "Verify your email, Coogbay",
        react: Email({ url:confirmationLink })
    });
}