export async function onRequest(context) {
  const url = new URL(context.request.url);
    const {
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
    } = context;
    await env.img_url.delete(params.id);
    return new Response(JSON.stringify(params.id), {
      headers: (`${url.hostname}:${url.port}` === "localhost:8788" ? {
          //"Access-Control-Allow-Origin":  "localhost:4321")
          "Access-Control-Allow-Origin":  "http://localhost:4321",
          "Access-Control-Allow-Credentials": "true"
      } : {})
    });
}