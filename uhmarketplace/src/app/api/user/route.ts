import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { prisma } from '../../../../prisma/prisma'; // Adjust the import based on your prisma setup
import { options } from '../auth/[...nextauth]/options'; // Adjust the import based on your project structure
import { NextResponse, NextRequest } from 'next/server';
import toast from 'react-hot-toast';

export async function PUT(req: NextRequest) { 
    const session = await getServerSession(options);

    const {name, profilePicUrl} = await req.json();

    try {
        const updateUser = await prisma.user.update({
            where: {
                email:session?.user?.email as string          
            },
            data: {
                name: name,
                profilePicUrl: profilePicUrl
            }
        })

        return NextResponse.json(updateUser, {status: 200});
    } catch (error) {
        console.error('Error updating account:', error);
        toast.error('An error occurred while updating the account.');
    }

}