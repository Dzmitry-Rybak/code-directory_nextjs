import { useCallback } from "react";

export const useHttp = () => {
    const request = useCallback(async(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        
        const response = await fetch(url, {method, body, headers});

        if (!response.ok) {
            const status = response.status;
            const errorData = await response.json();
            throw { status, message: errorData.message }; // было  return { status, message: errorData.message };
        }

        const data = await response.json();
        return data;

    }, []);

    return { request };
};