import DropEventHandlerInit from "./utils/DropEventHandlerInit.js"
import FileChooserInit from "./utils/FileChooserInit.js"

// init Handlers
DropEventHandlerInit(document.getElementById("drop-area"))
FileChooserInit(document.querySelector("input#file-chooser"))
