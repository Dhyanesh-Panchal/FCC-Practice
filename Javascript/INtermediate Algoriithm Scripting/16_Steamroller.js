function steamrollArray(arr) {
    let check;
    do {
        check = false;
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                check = true;
                let x = arr[i];
                arr.splice(i, 1, ...x);
            }
        }

    } while (check)
    return arr;
}

console.log(steamrollArray([1, [2], [3, [[4]]]]));