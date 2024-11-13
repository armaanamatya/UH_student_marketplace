import { prisma } from "../../prisma/prisma";
// User queries

export const getUserByEmail = async (email: string) => {
    try {
        const lowerCaseEmail = email.toLowerCase();
        const user = await prisma.user.findUnique({
            where: {
                email: lowerCaseEmail
            }
        })

        return user;
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (id: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const getUserPosts = async (email: string) => {
    try {
        const userPosts = await prisma.user.findMany({
            where: {
                email: email
            }
        })

        return userPosts;
    } catch (error) {
        console.log(error);
    }
}
