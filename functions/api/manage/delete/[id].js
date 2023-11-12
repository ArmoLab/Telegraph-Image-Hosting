export async function onRequest(context) {
    const {
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
    } = context;
    await env.img_url.delete(params.id);
    return new Response(JSON.stringify(params.id));
}