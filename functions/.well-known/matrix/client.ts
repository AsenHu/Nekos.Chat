interface Client {
    "m.homeserver": {
        "base_url": string;
    };
    "org.matrix.msc3575.proxy": {
        "url": string;
    };
}

export const onRequestGet: PagesFunction = async ({ request }) => {
    const continent: string = (request.cf.continent as string) || 'default';
    let tag: string;
    if (continent === 'AS') {
        const country = request.cf.country || 'default';
        if (country === 'CN') {
            tag = 'cn';
        } else {
            tag = continent.toLowerCase();
        }
    } else {
        tag = continent.toLowerCase();
    }

    const r: Client = {
        "m.homeserver": {
            "base_url": `https://${tag}-matrix-client.nekos.chat`
        },
        "org.matrix.msc3575.proxy": {
            "url": `https://${tag}-slidingsync.nekos.chat`
        }
    }
    return new Response(JSON.stringify(r), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}