import appendFilePreview from "./appendFilePreview.js";

export default function FileChooserInit (FileChooser) {
    FileChooser.addEventListener("change", async function () {
        appendFilePreview(this.files);
    })
}