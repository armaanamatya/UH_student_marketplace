import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}`;

    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'Password Reset Request',
        text: `Click the link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
}
