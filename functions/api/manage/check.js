export async function onRequest(context) {
    const url = new URL(context.request.url);
    if (!context.env.BASIC_USER){
        return new Response("Not using basic auth.", {
            status: 200,
            headers: (`${url.hostname}:${url.port}` === "localhost:8788" ? {
                //"Access-Control-Allow-Origin":  "localhost:4321")
                "Access-Control-Allow-Origin":  "http://localhost:4321",
                "Access-Control-Allow-Credentials": "true"
            } : {})
        });
    } else {
        return new Response("true", {
            status: 200,
            headers: (`${url.hostname}:${url.port}` === "localhost:8788" ? {
                //"Access-Control-Allow-Origin":  "localhost:4321")
                "Access-Control-Allow-Origin":  "http://localhost:4321",
                "Access-Control-Allow-Credentials": "true"
            } : {})
        });
    }
}