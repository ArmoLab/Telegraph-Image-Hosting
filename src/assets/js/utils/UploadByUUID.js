const BackendAPI =
    location.hostname === "localhost"
        ? "http://localhost:8788"
        : `https://${location.hostname}${location.port}`;

export default function UploadByUUID () {
    let UUID = this.parentElement.parentElement.getAttribute('UUID');
    console.log(FileArr[UUID])
    let TargetEl = document.querySelector(`div[uuid="${UUID}"]`);
    TargetEl.querySelector(".file-progress").innerText = "0%"
    TargetEl.querySelector(".progress").style.width = "0%"

    const form = new FormData()
    form.append(
        "photo",
        FileArr[UUID]
    )

    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${BackendAPI}/upload`);


    xhr.upload.addEventListener("progress", (event) => {
        let Progress = ((event.loaded / event.total) * 100).toFixed(2) + "%"
        console.log(`Uploading (${Progress})...`);
        TargetEl.querySelector(".file-progress").innerText = Progress;
        TargetEl.querySelector(".progress").style.width = Progress;
        if (Progress === "100.00%") {
            TargetEl.querySelector(".file-progress").innerText = "Processing";
            return;
        }
    });

    xhr.addEventListener("load", function () {
        TargetEl.querySelector(".file-progress").innerText = "Done"
        TargetEl.querySelector("code.file-url").innerText = `${BackendAPI}${JSON.parse(this.response)[0].src}`
    })

    xhr.send(form);
}