let binToDec = (a) => {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += (Number(a[a.length - i - 1]) * (2 ** i));
    }
    return sum;
}

function binaryAgent(str) {
    let arr = str.split(' ');
    // console.log(arr)
    console.log(str);
    str = "";
    for (let i of arr) {
        // console.log(binToDec(Number(i)))
        str += String.fromCharCode(binToDec(i));
    }
    return str;
}

console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));