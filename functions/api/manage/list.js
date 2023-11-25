export async function onRequest(context) {
    const url = new URL(context.request.url);
    return new Response(
        JSON.stringify((await context.env.img_url.list()).keys), {
            headers: (`${url.hostname}:${url.port}` === "localhost:8788" ? {
                //"Access-Control-Allow-Origin":  "localhost:4321")
                "Access-Control-Allow-Origin":  "http://localhost:4321",
                "Access-Control-Allow-Credentials": "true"
            } : {})
        }
    );
}