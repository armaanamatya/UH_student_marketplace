"use client"

import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

const VerifyEmailForm = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(success || error) {
            return;
        }

        if(!token) {
            setError("No token provided");
            return;
        }

        newVerification(token).then((data) => {
            if(data.success) {
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
    

    return(
        // This is not final and requires frontend to make it look pretty (:
        <div>
            {!success && !error && <p>Loading</p>}
            {!success && error}
        </div>
    )
}

export default VerifyEmailForm
