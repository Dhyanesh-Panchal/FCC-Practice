function orbitalPeriod(arr) {
    const GM = 398600.4418;
    const earthRadius = 6367.4447;

    arr = arr.map((key) => {
        return {
            name: key.name,
            orbitalPeriod: (() => {
                let ans = 2 * (Math.PI) * Math.sqrt(((key.avgAlt + earthRadius) ** 3) / GM);
                return Math.round(ans);
            })()
        }
    })
    return arr;
}

console.log(orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]));