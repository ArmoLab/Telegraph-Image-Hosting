import appendFilePreview from "./appendFilePreview.js";

export default function DropEventHandlerInit (DropArea) {
    function handleEvent (event) {
        // 阻止事件的默认行为
        event.preventDefault();
        if (event.type === "drop") {
            // 文件进入并松开鼠标,文件边框恢复正常
            DropArea.classList.remove("active")
            appendFilePreview(event.dataTransfer.files);
        } else if (event.type === "dragleave") {
            // out
            DropArea.classList.remove("active")
        } else {
            //in
            DropArea.classList.add("active")
        }
    }
    // 拖拽事件绑定
    DropArea.addEventListener("dragenter", handleEvent);
    DropArea.addEventListener("dragover", handleEvent);
    DropArea.addEventListener("drop", handleEvent);
    DropArea.addEventListener("dragleave", handleEvent);
    
}