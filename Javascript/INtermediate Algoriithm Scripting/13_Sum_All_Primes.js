let isPrime = (i) => {
    for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j == 0) {
            return false;
        }
    }
    return true;
}
function sumPrimes(num) {
    let sum = 0;
    for (let i = 2; i <= num; i++) {
        if (isPrime(i)) {
            sum += i;
        }
    }
    return sum;
}

sumPrimes(15);