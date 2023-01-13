function dropElements(arr, func) {
    while (arr.length) {
        if (func(arr[0])) {
            break;
        }
        arr.shift();
    }
    return arr;
}

dropElements([1, 2, 3], function (n) { return n < 3; });