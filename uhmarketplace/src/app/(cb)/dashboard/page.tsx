'use client'

import { useSession } from "next-auth/react"
// https://next-auth.js.org/getting-started/client
// Test the middleware by navigating to the /dashboard route
export default function Dashboard() {
    const { data: session, status } = useSession();
    
    if(status === "authenticated") {
        return <p>Signed in as {session.user?.email}</p>
    }

    return <a href="/api/auth/signin">Sign in</a>
}