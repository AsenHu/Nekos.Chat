/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface Client {
    "m.homeserver": {
        "base_url": string;
    };
    "org.matrix.msc3575.proxy": {
        "url": string;
    };
}

interface Server {
    "m.server": string;
}

export default {
    async fetch(request: Request): Promise<Response> {
        const path: string = new URL(request.url).pathname;
        const country = request.headers.get('cf-ipcountry')?.toLowerCase() ?? 'default';
        let r: Server | Client | undefined;

        if (path === '/.well-known/matrix/server') {
            r = {
                "m.server": `${country}-matrix-federation.nekos.chat:443`
            } as Server;
        }

        if (path === '/.well-known/matrix/client') {
            r = {
                "m.homeserver": {
                    "base_url": `https://${country}-matrix-client.nekos.chat`
                },
                "org.matrix.msc3575.proxy": {
                    "url": `https://${country}-slidingsync.nekos.chat`
                }
            } as Client;
        }

        return new Response(JSON.stringify(r), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
}