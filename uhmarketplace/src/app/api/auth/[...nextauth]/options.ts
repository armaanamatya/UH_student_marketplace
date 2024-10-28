import type { NextAuthOptions } from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
// I removed support by other means of logging in other than through microsoft authentication. The purpose for this is to truly restrict 
// access to the website to only uh.edu emails. Authentication will be done through nextauth and azure active directory. 

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
            tenantId: process.env.AZURE_AD_TENANT_ID as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email: ",
                    type: "text"
                },
                password: {
                    label: "Password: ",
                    type: "text"
                }
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email as string,
                        hashedPassword: credentials?.password as string,
                    }
                })
                console.log(user);
                return user;
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            if(user.email?.endsWith("@cougarnet.uh.edu")){
                return true
            } else {
                return false;
            }
        }
    }
}