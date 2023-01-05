function diffArray(arr1, arr2) {
    const newArr = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j in arr2) {
            if (arr2[j] == arr1[i]) {
                arr2[j] = arr1[i] = null;
                break;
            }
        }
    }
    arr1.forEach(ele => {
        if (ele) {
            newArr.push(ele);
        }
    })
    arr2.forEach(ele => {
        if (ele) {
            newArr.push(ele);
        }
    })
    return newArr;
}

console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));