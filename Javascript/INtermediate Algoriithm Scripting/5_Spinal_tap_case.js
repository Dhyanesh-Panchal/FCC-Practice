function spinalCase(str) {
    let myarr = str.split(/(?=[A-Z\s_])/);
    str = "";
    console.log(myarr);
    for (let i = 0; i < myarr.length - 1; i++) {
        myarr[i]
        if (myarr[i] == ' ' || myarr[i] == '_') {
            continue;
        }
        str += myarr[i].trim().toLowerCase() + '-';
    }
    str += myarr[myarr.length - 1].toLowerCase();

    return str;
}

console.log(spinalCase('Teletubbies say Eh-oh'));