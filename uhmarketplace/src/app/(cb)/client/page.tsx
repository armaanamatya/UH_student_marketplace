import { getServerSession } from 'next-auth/next';
import { options } from '../../api/auth/[...nextauth]/options';

export default async function client() {
    const session = await getServerSession(options);
    console.log(session?.user);
    return <h2>Home Page</h2>
}