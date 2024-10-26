import type { NextAuthOptions } from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
            tenantId: process.env.AZURE_AD_TENANT_ID as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "username-cool"
                },
                password: {
                    label: "Password:",
                    type: "password"
                }
            },
            async authorize(credentials) {
                // This is where we would retrieve data from the database
                // https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "alex", password: "nextauth"}

                if(credentials?.username === user.name && credentials?.password === user.password) {
                   return user;
                } else {
                    return null;
                }
            }
        })
    ],
}