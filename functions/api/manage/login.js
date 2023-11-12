export async function onRequest(context) {
    //redirect to admin page
    return Response.redirect(`${new URL(context.request.url).origin}/admin.html`, 302)
}