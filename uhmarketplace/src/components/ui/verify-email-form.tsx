"use client"

import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

const VerifyEmailForm = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const searchParams = useSearchParams();
    // grab the token value from the search params. 
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(success || error) {
            return;
        }

        if(!token) {
            setError("No token provided");
            return;
        }

        
        // the token is sent to the server to be validated and
        // this will wait for the response to come back.
        // Check verify-email-form for details of the errors.
        newVerification(token).then((data) => {
            if(data.success) {
                console.log(data.success);
                setSuccess(data.success);
            } 
            if(data.error) {
                setError(data.error);
            }
        }).catch((error) => {
            console.log(error);
            setError("An unexpected error has occured");
        });

    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [])
    
    console.log(success);

    return(
        // This is not final and requires frontend to make it look pretty (:
        // Also reroute logic would need to be added so it sends the user back to the login page to finish 
        <div className="text-black static min-h-screen flex">
            {!success && !error && <p>Loading</p>}
            {!success && error && <h2 className="text-5xl justify-self-center w-full p-5">{error}</h2>}
            {success && <h2 className="text-5xl">{success}! You can now sign in!</h2>}
        </div>
    )
}

export default VerifyEmailForm
