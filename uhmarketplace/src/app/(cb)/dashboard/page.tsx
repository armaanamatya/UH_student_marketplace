import { useSession } from "next-auth/react"
import { prisma } from "../../../../prisma/prisma";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Avatar } from "@nextui-org/react";
import ItemCard from "@/components/itemCard";

// https://next-auth.js.org/getting-started/client
// Test the middleware by navigating to the /dashboard route
export default async function Dashboard() {
    const session = await getServerSession(options);
    const profileImage = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        },
        // Only pulls the profilePicUrl from the user
        select: {
            profilePicUrl: true
        }
      })

    const userPosts = await prisma.user.findMany({
        where: {
            email: session?.user?.email as string
        }
    })

    if(session) {
        <p>Signed in as {session.user?.email}</p>
    } else {
        return <a href="/api/auth/signin">Sign in</a>
    }

    const posts = await prisma.post.findMany({
        where: {
            authorEmail: session?.user?.email as string
        }
    })

    return(
        <div className="flex flex-col max-h-screen justify-center items-center w-full h-full">
            <div className="bg-black text-white flex w-3/4 m-5 p-2">
                <Avatar
                src={profileImage?.profilePicUrl}
                size="md"
                >
                </Avatar>
                <h1 className="text-4xl px-5 self-center">Hello, {session.user?.name}</h1>
            </div>
            <div className="flex-row bg-black w-3/4 min-h-fit text-white">
                <h1 className="text-4xl">Your listings</h1>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <ItemCard item={post} ></ItemCard>
                    ))
                ): 
                    <h1 className="text-white">No active listings found.</h1>
                }

            </div>
        </div>
    )
}