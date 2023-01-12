function pairElement(str) {
    let arr = [];
    let pair = (c) => {
        if (c == 'A') {
            return 'T';
        }
        else if (c == 'T') {
            return 'A';
        }
        else if (c == 'G') {
            return 'C';
        }
        else if (c == 'C') {
            return 'G';
        }
    }

    for (let i of str) {
        arr.push([i, pair(i)]);
    }
    return arr;
}

pairElement("GCG");