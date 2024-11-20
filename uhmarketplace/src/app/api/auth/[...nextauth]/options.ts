import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt";
import { Adapter } from "next-auth/adapters";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/zod";
import { getUserById } from "@/data/user";
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
            //@ts-expect-error: nextAuth TS error
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

                    if(!user){
                        return null;
                    }
                    
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
            // If the email does not end with @uh.edu, it will not allow
            // the user to sign in. This will be the same for when a user registers.
            // We are gonna leave it as both for now for the sake of simplicity
            if(user.email?.endsWith("@uh.edu") || user.email?.endsWith("@gmail.com")) {
            //@ts-expect-error: temporary fix
                const existingUser = await getUserById(user.id as number);

                //if the emailVerified value does not exist, return false
                if(!existingUser?.emailVerified){
                    return false;
                }

                return true;
            } else {
                return false;
            }


        },
        async redirect({ url, baseUrl }) {
            return baseUrl
          }
    },
    // Here is where we would customize the signIn/signOut page so we are not forced to use
    // NextAuths pages
    pages: {
        signIn: '/login',
        // https://next-auth.js.org/configuration/pages
    }
}