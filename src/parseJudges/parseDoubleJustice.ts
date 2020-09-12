const doubleJusticePattern = {
    CourtDoubleJustice: /\s{2}Court:\s*([\s\S]*),\s([a-zA-Z0-9\u00C0-\u02AB ']*)\s+JJ\s{3}[\r\n\f]*/,
    CourtDoubleJustice2: /\s{2}Court:\s*([a-zA-Z0-9\u00C0-\u02AB ']*)\s+JJ\s[\r\n\f]*\s/,
};
const textSeparators = [',', ' AND '];
export default (data, judgeTitles) => {
    const result = [];
    for (const key in doubleJusticePattern) {
        const temp = data.match(doubleJusticePattern[key]);
        if (temp) {
            const tempLength = temp.length;
            let tempIndex = 0;
            for (let i = 1; i < tempLength; i++) {
                //jdo_1537189201000_e1fa7853-d38a-4c9a-8cc6-a68d5462f955.pdf
                const justices = temp[i].split(new RegExp(textSeparators.join('|'), 'gi'));
                const justicesLength = justices.length;
                for (let counter = 0; counter < justicesLength; counter++) {
                    let proceed = true;
                    const justiceValue = justices[counter].trim();
                    for (const property in judgeTitles) {
                        //console.log(`${property}: ${object[property]}`);
                        const judgeTitleRegExp = new RegExp(
                            `\^\[a-zA-Z0-9\u00C0-\u02AB\s\']*\\s+${judgeTitles[property].short_title}`,
                        );
                        if (justiceValue.match(judgeTitleRegExp)) {
                            proceed = false;
                        }
                    }
                    if (proceed) {
                        if (tempIndex === 0) {
                            tempIndex = temp.index;
                        }
                        result.push(justiceValue);
                    }
                }
            }
            return { value: result, valueIndex: tempIndex };
        }
    }
    return null;
};
