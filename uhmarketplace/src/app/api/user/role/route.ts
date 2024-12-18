import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../../../prisma/prisma'; // Adjust the import based on your prisma setup
import { options } from '../../auth/[...nextauth]/options'; // Adjust the import based on your project structure
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const session = await getServerSession(options);

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })

    return NextResponse.json(user, {status: 200});
}