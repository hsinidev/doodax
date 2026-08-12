
interface ApiResponse {
    statusCode?: number;
    statusText?: string;
    error?: string;
}

export default async function handler(
  req: any,
  res: any
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { url } = req.body;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL is required.' });
    }

    try {
        new URL(url);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid URL format provided.' });
    }

    try {
        // Use a HEAD request to be lightweight and fetch only headers, not the full body.
        // We set redirect: 'manual' to get the status of the exact URL provided.
        const response = await fetch(url, {
            method: 'HEAD',
            redirect: 'manual',
            headers: {
                'User-Agent': 'Doodax-Link-Checker/1.0',
                'Accept': '*/*',
            },
        });

        return res.status(200).json({
            statusCode: response.status,
            statusText: response.statusText,
        });

    } catch (error: any) {
        // This catches network errors (e.g., DNS resolution failure, connection refused).
        // It doesn't typically catch HTTP error statuses like 404, as fetch considers those "successful" requests.
        console.error('Fetch error:', error);
        // We don't return a specific status code here because the request itself failed.
        // We return a generic error message.
        return res.status(500).json({ error: `Request failed: ${error.message}. The server may be offline or the domain may not exist.` });
    }
}