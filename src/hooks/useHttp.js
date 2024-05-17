import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const responseDate = await response.json();

    if (!response.ok) {
        const errorMessage = responseDate.message || 'Something went wrong, failed to send request.';
        throw new Error(errorMessage);
    }

    return responseDate;
}

export default function useHttp(url, initialData, config) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try {
            const responseData = await sendHttpRequest(url, { ...config, body: data });
            setData(responseData);
        } catch (error) {
            setError(error.message || 'Something went wrong!')
        }
        setIsLoading(false)
    }, [url, config]);

    useEffect(() => {
        if (!config || config?.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest, config])

    return {
        isLoading,
        data,
        error,
        sendRequest
    }
}