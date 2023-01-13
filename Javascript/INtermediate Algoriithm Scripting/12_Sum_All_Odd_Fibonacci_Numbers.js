function sumFibs(num) {
    let a = 0, b = 1, sum = 0, c = 0;
    while (c <= num) {

        // console.log(c);
        a = b;
        b = c;
        if (c % 2 == 1)
            sum += c;
        c = a + b;
    }
    return sum;
}

console.log(sumFibs(4));