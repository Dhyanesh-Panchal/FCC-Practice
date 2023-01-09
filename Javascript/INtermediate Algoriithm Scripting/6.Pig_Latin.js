function translatePigLatin(str) {

    if (/^[aeiou]/.test(str)) {
        str += 'way'
        return str;
    }
    else {
        let arr = str.split(/^([^aeiou]+)/);
        console.log(arr);
        str = arr[2] + arr[1] + 'ay';

        return str;
    }

}

console.log(translatePigLatin("california"));