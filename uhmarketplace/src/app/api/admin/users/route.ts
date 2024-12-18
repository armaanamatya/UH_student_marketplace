import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../../../prisma/prisma'; // Adjust the import based on your prisma setup
import { options } from '../../auth/[...nextauth]/options' // Adjust the import based on your project structure
import { NextResponse, NextRequest } from 'next/server';
import { user } from '@nextui-org/react';

export async function GET(req: NextRequest) {
    const session = await getServerSession(options);

    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({users}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: 'Internal server error'}, {status: 500});
    }
}