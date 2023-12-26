"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Error = (error, reset) => {
    const router = useRouter();

    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <>
            <h1>Error, something wrong</h1>
            <button onClick={() => router.push('/')}>Go home</button>
            <button onClick={() => router.back()}>Go back</button>
        </>
    )
}

export default Error;