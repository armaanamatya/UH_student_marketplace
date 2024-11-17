import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Secret key for JWT (ensure it's stored in .env)

export function generateResetToken(email: string): string {
    const payload = { email };  // Payload can include email or userId
    const options = { expiresIn: '1h' };  // Token will expire in 1 hour

    // Generate the JWT token
    const token = jwt.sign(payload, SECRET_KEY, options);
    return token;
}