export async function onRequest(context) {
    if (!context.env.BASIC_USER){
        return new Response("Not using basic auth.", { status: 200 });
    } else {
        return new Response("true", { status: 200 });
    }
}