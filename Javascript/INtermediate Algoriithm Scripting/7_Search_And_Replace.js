function myReplace(str, before, after) {
    if (before.charCodeAt(0) < 97) {
        str = str.replace(before, after[0].toUpperCase() + after.substr(1));
        return str;
    }
    else {
        str = str.replace(before, after[0].toLowerCase() + after.substr(1));
    }
    return str;
}

myReplace("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped");