const getCitation = (str: string): string => {
    const regCite = /(\[?\d{4}\]?)(\s*?)NZ(D|F|H|C|S|L)(A|C|R)(\s.*?)(\d+)*/;
    // try for neutral citation
    if (str.match(regCite)) {
        return str.match(regCite)[0];
    } else {
        // try for other types of citation
        const otherCite = /((\[\d{4}\])(\s*)NZ(D|F|H|C|S|L)(A|C|R)(\s.*?)(\d+))|((HC|DC|FC) (\w{2,4} (\w{3,4}).*)(?=\s\d{1,2} ))|(COA)(\s.{5,10}\/\d{4})|(SC\s\d{0,5}\/\d{0,4})/;
        if (str.match(otherCite)) {
            return str.match(otherCite)[0];
        } else {
            return null;
        }
    }
};

const toLegislationUrl = (url: string): string => {
    return url
        .toString() // Convert to string
        .normalize('NFD') // Change diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
        .replace(/\s+/g, '-') // Change whitespace to dashes
        .toLowerCase() // Change to lowercase
        .replace(/&/g, '') // Replace ampersand
        .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
        .replace(/-+/g, '-') // Remove duplicate dashes
        .replace(/^-*/, '') // Remove starting dashes
        .replace(/-*$/, ''); // Remove trailing dashes
};

export { getCitation, toLegislationUrl };
