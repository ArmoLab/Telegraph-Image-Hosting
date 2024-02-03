export default function RemoveByUUID () {
    let Element = this.parentElement.parentElement;
    let UUID = Element.getAttribute("UUID");
    delete FileReader[UUID];
    try {
        Element.remove()
    } catch (err) {
        Element.innerHTML = "";
        Element.style.display = "none";
    }
}