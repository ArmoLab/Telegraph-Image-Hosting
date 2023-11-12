export async function onRequest(context) {
    return new Response(JSON.stringify((await context.env.img_url.list()).keys));
}