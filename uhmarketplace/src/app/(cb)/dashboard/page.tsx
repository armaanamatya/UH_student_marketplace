import { useSession } from "next-auth/react";
import { prisma } from "../../../../prisma/prisma";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Avatar, user } from "@nextui-org/react";
import Link from "next/link";
import ItemCard from "@/components/itemCard";
import axios from "axios";
import toast from "react-hot-toast";
import UserPosts from "@/components/userActions/UserPosts";

// https://next-auth.js.org/getting-started/client
// Test the middleware by navigating to the /dashboard route
export default async function Dashboard() {
  const session = await getServerSession(options);
  const profileImage = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    // Only pulls the profilePicUrl from the user
    select: {
      profilePicUrl: true,
    },
  });

  const userPosts = await prisma.post.findMany({
    where: {
      authorEmail: session?.user?.email as string,
    },
  });

  if (!session) {
    return <a href="/api/auth/signin">Sign in</a>;
  }

    const userInfo = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }, 
        select: {   
            name: true,
            email: true,
            profilePicUrl: true,
            role: true,
        }
    })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">CoogBay User Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {session ? (
                <div>
                  <div className="flex items-center space-x-4 p-5">
                    <Avatar
                      src={profileImage?.profilePicUrl}
                      alt="Profile Picture"
                      size="md"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        Welcome, {userInfo?.name}
                      </h2>
                      <p className="text-gray-600">{session?.user?.email}</p>
                    </div>
                    <Link href={'/dashboard/userProfile'}>
                      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                        Edit Profile
                      </button>
                    </Link>
                    {userInfo?.role === 'ADMIN' && (
                        <Link href={'/adminDashboard'}>
                            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                            Admin Dashboard
                            </button>
                        </Link>
                    )}

                    <Link href={'/create_post'}>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Create New Listing
                    </button>
                  </Link>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-medium font-extrabold">Your Listings</h3>
                    {/* <ul className="mt-2"> */}
                    <div className="overflow-y-auto max-h-96">
                    {userPosts.length > 0 ? (
                            <UserPosts userPosts={userPosts} />
                        ) : (
                            <p className="text-center text-gray-600 mt-4">
                            No listings, create one now!
                            </p>
                        )}
                    </div>
                      {/* {userPosts.map((post) => (
                        <li
                          key={post.id}
                          className="bg-white shadow overflow-hidden rounded-lg mt-2"
                        >
                          <div className="px-4 py-5 sm:p-6">
                            <h4 className="text-lg font-medium">{post.title}</h4>
                            <p className="text-gray-600">{post.authorEmail}</p>
                            <div className="mt-4">
                              <button className="px-4 py-2 bg-yellow-500 text-white rounded mr-2">
                                Edit
                              </button>
                              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => deletePost(post.id)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      ))} */}
                    {/* </ul> */}
                  </div>
                </div>
              ) : (
                <p>Please sign in to view your dashboard.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}