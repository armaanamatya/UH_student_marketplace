"use client"

import { newVerification } from "@/actions/new-verification";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VerifyEmailForm = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [countdown, setCountdown] = useState<number>(5); // Countdown starts from 5 seconds

    const searchParams = useSearchParams();
    const router = useRouter();
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
            setError("An unexpected error has occurred");
        });

    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    useEffect(() => {
        if (success) {
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            if (countdown === 0) {
                clearInterval(interval);
                router.push("/login"); // Redirect to login page
            }

            return () => clearInterval(interval);
        }
    }, [success, countdown, router]);

    return (
        <div className="text-black static min-h-screen flex flex-col items-center justify-center">
            {!success && !error && <p>Loading...</p>}
            {!success && error && <h2 className="text-5xl justify-self-center w-full p-5">{error}</h2>}
            {success && (
                <div className="text-center">
                    <h2 className="text-5xl">{success}! You can now sign in!</h2>
                    <p className="text-xl mt-4">Redirecting in {countdown} seconds...</p>
                </div>
            )}
        </div>
    );
};

export default VerifyEmailForm;