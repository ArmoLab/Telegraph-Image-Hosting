export async function onRequest(context) {
  const url = new URL(context.request.url);
    const {
      env, // same as existing Worker API
      params // if filename includes [id] or [[path]]
    } = context;
    //read the metadata
    const value = await env.img_url.getWithMetadata(params.id);
    //change the metadata
    value.metadata.ListType = "Block"
    await env.img_url.put(params.id,"",{metadata: value.metadata});
    return new Response(JSON.stringify(value.metadata), {
      headers: (`${url.hostname}:${url.port}` === "localhost:8788" ? {
          //"Access-Control-Allow-Origin":  "localhost:4321")
          "Access-Control-Allow-Origin":  "http://localhost:4321",
          "Access-Control-Allow-Credentials": "true"
      } : {})
    });
}