function diffArray(arr1, arr2) {
    const newArr = [];
    for (let i = 0; i < arr1.length; i++) {

        if (arr2.find(ele => {
            if (ele == arr1[i]) {
                ele = null;
                return 1;
            } else { return 0 }
        })) {
            arr1[i] = null;
            // console.log(arr1[i]);
        }
    }
    console.log(arr1, arr2);
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

console.log(diffArray([1, 2, 3, 5, 6], [1, 2, 3, 4, 5]));