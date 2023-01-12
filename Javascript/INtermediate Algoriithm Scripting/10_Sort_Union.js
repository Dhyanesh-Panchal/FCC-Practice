function uniteUnique(...arr) {
    let ans = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!ans.includes(arr[i][j])) {
                ans.push(arr[i][j])
            }
        }
    }
    return ans;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);