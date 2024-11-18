import { prisma } from "../../prisma/prisma";

export const getPostByID = async (id: number) => {
    try{
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })

        return post;
    } catch (error) {
        console.log(error);
    }
}