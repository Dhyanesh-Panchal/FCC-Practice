let LCM = (x, y) => {
    let a = Math.max(x, y);
    while (1) {
        if (a % x == 0 && a % y == 0) {
            break;
        } a++;
    }
    return a;
}
function smallestCommons(arr) {
    let x = LCM(...arr);
    console.log(x);

    for (let i = Math.max(...arr); i >= Math.min(...arr); i--) {
        if (x % i != 0) {
            x = LCM(x, i);
        }
    }

    return x;
}

console.log(smallestCommons([2, 10]));