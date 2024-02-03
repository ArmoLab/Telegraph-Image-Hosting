export default function uuidv4 () {
    function to16ByteStr(Start, End) {
        return `${Bytes.slice(Start, End).toString().replace(/,/gi, "")}`
    }
    let Bytes = function () {
        let units = new Uint8Array(20);
        crypto.getRandomValues(units);
        let BytesArray = [];
        for (let i in units) {
            BytesArray.push(units[i].toString(16).padStart(2, "0"));
        }
        return BytesArray;
    }()
    return `${to16ByteStr(0, 4)}-${to16ByteStr(5, 7)}-${to16ByteStr(8, 10)}-${to16ByteStr(11, 13)}-${to16ByteStr(14, 20)}`;
}