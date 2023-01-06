function destroyer(arr, ...eles) {
    // console.log(eles);
    for (let i = 0; i < eles.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            // console.log("inside i");
            if (arr[j] == eles[i]) {
                // console.log(arr[j]);
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

console.log(destroyer([3, 5, 1, 2, 2], 2, 3, 5));