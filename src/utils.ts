export const handleErrorResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Request error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`Request error: ${response.status} ${response.statusText}`);
    }
};

