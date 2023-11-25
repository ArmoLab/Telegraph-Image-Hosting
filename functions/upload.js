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
    const url = new URL(context.request.url);
    return new Response("OK", {
        status: 200,
        headers: (
            `${url.hostname}:${url.port}` === "localhost:8788"
                ? {
                    //"Access-Control-Allow-Origin":  "localhost:4321")
                    "Access-Control-Allow-Origin":  "http://localhost:4321",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "POST, OPTIONS"
                } : {
                    "Access-Control-Allow-Origin": (`${url.hostname}:${url.port}` === "localhost:4321" && "*"),
                    "Access-Control-Allow-Methods": "POST, OPTIONS"
                }
        )
    });
}
