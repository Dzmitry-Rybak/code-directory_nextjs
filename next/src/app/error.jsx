"use client";
import { useEffect } from "react";
import { redirect } from 'next/navigation';

const Error = (error, reset) => {

    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <>
            <h1>Error, something wrong</h1>
            <button onClick={() => redirect('/')}>Go home</button>
        </>
    )
}

export default Error;