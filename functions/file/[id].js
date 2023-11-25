export async function onRequest(context) {  // Contents of context object  
    const {
        request, // same as existing Worker API    
        env, // same as existing Worker API    
        params // if filename includes [id] or [[path]]
    } = context;

    const url = new URL(request.url);
    console.log(url.origin)
    const BlockedNotice = 
    (`${url.hostname}:${url.port}` === "localhost:8788"
        ? `http://localhost:4321/notices/request_blocked.png`
        : `${url.origin}/notices/request_blocked.png`
    )


    // retuen when referer !== admin page
    if (request.headers.get("Referer") !== `${url.origin}/admin`) {
        // if KV enabled 
        if (env.img_url) {

            // then we check the record from KV
            const record = await env.img_url.getWithMetadata(params.id);
            console.log("record:" + record)
    
            // if the Target image has been checked
            if (record.metadata !== null) {

                // if blocked 
                if (record.metadata.ListType == "Block") {
                    return Response.redirect(BlockedNotice, 302)
                }
    
                // if AllowList enabled.
                if (env.WhiteList_Mode == "true") {
                    if (record.metadata.ListType !== "White") {
                        return Response.redirect(BlockedNotice, 302)
                    }
                }
    
                // if target image is unsafe
                if (record.metadata.Label == "adult") {
                    return Response.redirect(BlockedNotice, 302)
                }
    
            } else if (!env.ModerateContentApiKey) {
                // if Moderate disabled & target image is first request
                // assume that the image is passed the request
                let time = new Date().getTime();
                await env.img_url.put(params.id, "", {
                    metadata: { ListType: "None", Label: "None", TimeStamp: time },
                });
            }
    
        }
    


        // if Moderate enabled & target image not checked
        // then wo gonna to check the image 
        if (env.ModerateContentApiKey) {
    
            let time = new Date().getTime(),
                apikey = env.ModerateContentApiKey;
    
            await fetch(`https://api.moderatecontent.com/moderate/?key=${apikey}&url=https://telegra.ph/${url.pathname}${url.search}`)
            .then( response => response.json() )
            .then(async (response) => {
                if (env.img_url) {
                    await env.img_url.put(params.id, "", {
                        metadata: { ListType: "None", Label: moderate_data.rating_label, TimeStamp: time },
                    });
                }
                if (response.rating_label == "adult") {
                    return Response.redirect(BlockedNotice, 302)
                }
            });
    
        }
    }






    return fetch(`https://telegra.ph/${url.pathname}${url.search}`, {
        method: request.method,
        headers: request.headers,
        body: request.body,
    })
}
