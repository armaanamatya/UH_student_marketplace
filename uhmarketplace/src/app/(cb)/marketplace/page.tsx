'use client'
import { prisma } from "../../../../prisma/prisma";
import { Card, Image, CardBody, CardFooter } from '@nextui-org/react'

// https://next-auth.js.org/getting-started/client
// Test the middleware by navigating to the /dashboard route
export default async function Marketplace() {
    const posts = await prisma.post.findMany();

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {posts.map((post) => (
            <Card shadow="sm" key={post.id}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={post.title}
                  className="w-full object-cover h-[140px]"
                  src={post.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA-3SEkzvkpZZxyJoONE7BQSnv7ruH8vNZQ&s"}
                />
                <CardFooter className="text-small justify-between">
                    <b>{post.title}</b>
                    <p>Created by: {post.authorName}</p>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </div>
      );
    }
