import uuidv4 from "./uuidv4.js";
import toReadableSize from "./toReadableSize.js";

import UploadByUUID from "./UploadByUUID.js";
import RemoveByUUID from "./RemoveByUUID.js";

window.FileArr = {};

export default function appendFilePreview (files) {
    for (let file of files) {
        const { name, size } = file;
        const FileUUID = uuidv4();
        
        window.FileArr[FileUUID] = file;

        let FilePreviewEl = document.querySelector("#FilesPreview .file.prototype").cloneNode(true);
        FilePreviewEl.classList.remove("prototype")
        FilePreviewEl.setAttribute("UUID", FileUUID)
        FilePreviewEl.querySelector(".file-name").innerText = name;
        FilePreviewEl.querySelector(".file-size").innerText = toReadableSize(size);
        FilePreviewEl.querySelector(".file-progress").innerText = "0%";
        FilePreviewEl.querySelector(".progress").style.width = "0%";
        FilePreviewEl.querySelector("button[data-action=\"upload\"]").addEventListener("click", UploadByUUID)
        FilePreviewEl.querySelector("button[data-action=\"remove\"]").addEventListener("click", RemoveByUUID)

        document.querySelector("#FilesPreview").appendChild(FilePreviewEl);
    }
}