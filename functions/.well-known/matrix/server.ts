interface Server {
    "m.server": string;
}

export const onRequestGet: PagesFunction = async (context: { request: Request }) => {
    const continent: string = (context.request.cf.continent as string) || 'default';
    let tag: string;
    if (continent === 'AS') {
        const country = context.request.cf.country || 'default';
        if (country === 'CN') {
            tag = 'cn';
        } else {
            tag = continent.toLowerCase();
        }
    } else {
        tag = continent.toLowerCase();
    }

    const r: Server = {
        "m.server": `${tag}-matrix-federation.nekos.chat:443`
    }
    return new Response(JSON.stringify(r), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}