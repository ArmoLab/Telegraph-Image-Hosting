export async function onRequest(context) {
    const {
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
    } = context;
    const value = await env.img_url.getWithMetadata(params.id);
    //change the metadata
    value.metadata.ListType = "White"
    await env.img_url.put(params.id, "", {metadata: value.metadata});
    return new Response(JSON.stringify(value.metadata));
}