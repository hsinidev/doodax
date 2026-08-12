
interface RedirectStep {
    url: string;
    status: number;
    redirectedTo: string | null;
}

interface ApiResponse {
    redirectChain: RedirectStep[];
    finalUrl: string;
    error?: string;
}

export default async function handler(
  req: any,
  res: any
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const { url: initialUrl } = req.body;

    if (!initialUrl || typeof initialUrl !== 'string') {
        return res.status(400).json({ error: 'URL is required', redirectChain: [], finalUrl: '' });
    }

    try {
        new URL(initialUrl);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid URL format provided.', redirectChain: [], finalUrl: '' });
    }

    const redirectChain: RedirectStep[] = [];
    let currentUrl = initialUrl;
    const maxRedirects = 15;

    for (let i = 0; i < maxRedirects; i++) {
        try {
            const response = await fetch(currentUrl, {
                method: 'GET',
                redirect: 'manual', // CRITICAL: Do not follow redirects automatically
                headers: {
                    'User-Agent': 'Doodax-Redirect-Tester/1.0',
                },
            });

            const status = response.status;
            const location = response.headers.get('location');

            if ((status >= 300 && status < 400) && location) {
                const nextUrl = new URL(location, currentUrl).href;
                redirectChain.push({
                    url: currentUrl,
                    status,
                    redirectedTo: nextUrl,
                });
                currentUrl = nextUrl;
            } else {
                // This is the final destination
                redirectChain.push({
                    url: currentUrl,
                    status,
                    redirectedTo: null,
                });
                return res.status(200).json({ redirectChain, finalUrl: currentUrl });
            }
        } catch (error: any) {
            return res.status(500).json({ error: `Failed to fetch URL: ${error.message}`, redirectChain, finalUrl: currentUrl });
        }
    }

    return res.status(500).json({ error: `Exceeded maximum redirects of ${maxRedirects}.`, redirectChain, finalUrl: currentUrl });
}