import { prisma } from "../../../../../prisma/prisma";
import Link from "next/link";
// import ProductCard from "@/components/product/ProductCard";

export default async function Product({
    params,
}: {
    params: Promise<{ productId: number }>
}) {
    const paramData = Number((await params).productId);

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: paramData
            }
        })

        if(post) {
            return (
                <div className="max-w-6xl mx-auto bg-white p-10 rounded-lg shadow-md mt-10">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2">
                            <img src={post.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s"} alt={post.title} className="w-full h-auto rounded-lg" />
                        </div>
                        <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
                            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
                            <p className="text-gray-700 mb-6">{post.description}</p>
                            <p className="text-3xl font-semibold text-blue-600 mb-6">${post.price.toString()}</p>
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Buy Now</button>
                            <p className="text-gray-700 mb-6 pt-5">Created by: {post.authorName}</p>
                            <p className="text-gray-700 mb-6">Authors Email: {post.authorEmail}</p>
                            <p className="text-gray-700 mb-6">{post.createdAt.toLocaleDateString()}</p>
                            <Link href="/marketplace">
                                <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                    Back to Marketplace
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <h1 className="text-center text-2xl mt-10">404 - Page Not Found.</h1>
        }

    } catch (error) {
        return <h2 className="text-center text-2xl mt-10">Wrong turn partner.</h2>
    }
}