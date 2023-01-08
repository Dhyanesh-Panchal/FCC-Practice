function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
noisy(Math.max)(3, 2, 1);
  // → calling with [3, 2, 1]
  // → called with [3, 2, 1] , returned 1