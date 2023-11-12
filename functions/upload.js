export async function onRequestPost (context) {
    const { request } = context;
    const url = new URL(request.url);
    
    const response = await fetch(`https://telegra.ph/${url.pathname}${url.search}`, {
        method: request.method,
        headers: request.headers,
        body: request.body,
    });

    let headers = new Headers(response.headers);
    headers.set("access-control-allow-origin", "*");
    return new Response(response.body, {
        status: response.status,
        headers
    });
}
export async function onRequestOptions (context) {
    return new Response("OK", {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
        }
    });
}
