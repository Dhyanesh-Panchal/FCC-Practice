function addTogether(...vals) {
    if (vals.length == 2) {
        if (vals[0] === Number(vals[0]) && vals[1] === Number(vals[1])) {
            return vals[0] + vals[1];
        }
        return;
    }

    if (Number(vals[0])) {
        return (i) => {
            if (Array.isArray(i)) {
                return;
            }
            return i + vals[0]
        };

    }
    return;

}

addTogether(2, 3);