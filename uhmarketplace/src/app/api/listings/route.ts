// src/app/api/listings/route.ts

import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../../prisma/prisma'; // Adjust the import based on your prisma setup
import { options } from '../auth/[...nextauth]/options'; // Adjust the import based on your project structure
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options);

  const {id} = await req.json();
  console.log(id);

  try {
    const updatedListing = await prisma.post.delete({
      where: {
        id: id,
      }
    })

    return NextResponse.json(updatedListing, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  const {title, description, price, imageUrl} = await req.json();

  try {
    const newListing = await prisma.post.create({
      data: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        authorEmail: session?.user?.email as string,
        authorName: session?.user?.name as string,
      }
    })

    return NextResponse.json(newListing, {status: 201});
  } catch (error) {
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}

