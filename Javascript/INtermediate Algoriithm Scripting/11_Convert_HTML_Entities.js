function convertHTML(str) {
    str = str.replace('&', '&amp;');
    while (!(str.search('<') == -1 && str.search('>') == -1 && str.search('"') == -1 && str.search("'") == -1)) {

        // console.log(str);
        str = str.replace('<', '&lt;');
        // console.log(str)
        str = str.replace('>', '&gt;');
        str = str.replace('"', '&quot;');
        str = str.replace("'", '&apos;');
    }
    console.log(str)
    return str;
}

convertHTML("Hamburgers < Pizza < Tacos");