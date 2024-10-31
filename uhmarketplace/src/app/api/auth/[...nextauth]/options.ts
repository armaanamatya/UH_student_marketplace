import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt";
import { Adapter } from "next-auth/adapters";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/zod";
// I ended up opting for a normal credential log in using JWT for the session

export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma) as unknown as Adapter,
    providers: [
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
                try{
                    if(!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const { email , password } = await signInSchema.parseAsync(credentials)


                    const user = await prisma.user.findUnique({
                        where: {
                            email: email as string,
                        }
                    })
                    
                    // Compare the password to the hashed version in the database using bcrypt compare
                    const compareHash = await compare(password, user.hashedPassword)
    
                    if(!compareHash) {
                        return null;
                    } else {
                        return user;
                    }

                } catch (error) {
                    if(error instanceof ZodError) {
                        return null;
                    }
                }
                
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            // If the email does not end with @cougarnet.uh.edu, it will not allow
            // the user to sign in. This will be the same for when a user registers.
            if(user.email?.endsWith("@uh.edu")){
                return true
            } else {
                return false;
            }
        }
    },
    // Here is where we would customize the signIn/signOut page so we are not forced to use
    // NextAuths pages
    pages: {
        // https://next-auth.js.org/configuration/pages
    }
}