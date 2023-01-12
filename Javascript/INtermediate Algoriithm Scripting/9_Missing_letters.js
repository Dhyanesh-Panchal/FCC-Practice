function fearNotLetter(str) {
    let fchar = str.charCodeAt(0);
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) - fchar != i) {
            return String.fromCharCode(i + fchar);
        }
    }
    return;
}

console.log(fearNotLetter("abcdef"));