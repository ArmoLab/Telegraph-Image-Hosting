export async function onRequest(context) {
    return new Response("Logged out.", { status: 401 });
}