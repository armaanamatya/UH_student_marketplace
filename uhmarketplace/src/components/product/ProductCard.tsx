'use client'
import React from 'react';
import { useSession } from "next-auth/react"
import { Post } from '@prisma/client';
import { Image } from '@nextui-org/react';
import ProductButton from './ProductButton';

type props = {
    post: Post | null;
}

const ProductCard = (props:props) => {
    const { data: session, status } = useSession();

    return(
        <div className='flex-col w-1/2 bg-white'>
            <h1 className='text-black'>{props.post?.title}</h1>
            <h1 className='text-black'>{props.post?.description}</h1>
            <Image
                radius="lg"
                width="100%"
                height="100%"
                alt={props.post?.title}
                className="w-full object-cover h-[140px]"
                src={props.post?.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA-3SEkzvkpZZxyJoONE7BQSnv7ruH8vNZQ&s"}
            />
            {session ? (
                <ProductButton></ProductButton>
            ): 
                null
            }
            <h1 className='text-black'>Made by {props.post?.authorName}</h1>
            <h1 className='text-black'>Cougar Email: {props.post?.authorEmail}</h1>
            <h1 className='text-black'>Created at: {props.post?.createdAt.toLocaleString()}</h1>
            </div>
    )
}

export default ProductCard