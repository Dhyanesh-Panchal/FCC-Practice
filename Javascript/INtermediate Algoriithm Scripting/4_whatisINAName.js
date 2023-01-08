function whatIsInAName(collection, source) {
    let ans = collection;
    let myProps = Object.keys(source);
    for (let i = 0; i < ans.length; i++) {
        for (let key of myProps) {
            // console.log(ans[i][key], source[key])
            if (ans[i][key] != source[key]) {
                // console.log(ans[i][key], source[key])
                ans.splice(i, 1);
                i--;
                break;
            }
        }
    }
    return ans;
}

console.log(whatIsInAName([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 }));
