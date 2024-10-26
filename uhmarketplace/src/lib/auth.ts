import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "sign in"
        })
    ],
}