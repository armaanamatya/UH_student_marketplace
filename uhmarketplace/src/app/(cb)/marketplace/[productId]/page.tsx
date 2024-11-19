import { prisma } from "../../../../../prisma/prisma";
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
                <div>
                    {/* <ProductCard post={post}></ProductCard> */}
                </div>
            )
        } else {
            return <h1>404 - Page Not Found.</h1>
        }

    } catch (error) {
        return <h2>Wrong turn partner.</h2>
    }
}