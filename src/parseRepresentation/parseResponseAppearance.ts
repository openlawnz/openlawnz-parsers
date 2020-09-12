import { parse4, parse5, mergeData, parseAppearance1, parseSeparator } from '../utils/parseUtility';
export default (data) => {
    const responseAppearanceNames = [];

    //2004-2005 case files
    const responseAppearancePattern3 = [
        {
            item: [
                {
                    pattern: /(on (his|her) own behalf|counsel for appellant.?|in person.?|for Appellant.?|for self)\s([a-zA-Z0-9\u00C0-\u02AB\s'(),.-]*)\s(for Respondent|for First Respondent|for the Respondent|for the Corporation|for ACC)/im,
                    patternResultIndex: 3,
                },
                {
                    pattern: /(for Appellant.?)(\s)([a-zA-Z0-9\u00C0-\u02AB\s'(),.-]*)(, Respondent, in person.)/im,
                    patternResultIndex: 3,
                },
                {
                    pattern: /(for Appellant.?)(\s)([a-zA-Z0-9\u00C0-\u02AB\s'(),.-]*)/im,
                    patternResultIndex: 3,
                },
                {
                    pattern: /(for the App?ellant.?)\s([a-zA-Z0-9\u00C0-\u02AB\s'(),.\-–]*)\s(for the Respondent)/im,
                    patternResultIndex: 2,
                },
            ],
            ///(on his own behalf|counsel for appellant.?|in person.?|for Appellant.?)\s([a-zA-Z0-9\u00C0-\u02AB\s'\(\),.-]*)\sfor Respondent/mi
        },
        {
            item: [
                {
                    pattern: /(First Respondent)\s([a-zA-Z0-9\u00C0-\u02AB\s'(),.-]*)\s(for Second Respondent)/im,
                    patternResultIndex: 2,
                },
            ],
        },
    ];
    const result3 = parse5(data, responseAppearancePattern3);
    const responseAppearancePattern3Custom1 = /([a-zA-Z0-9\u00C0-\u02AB\s'(),.]*)(\scounsel|\sAdvocate|(-|–)\scounsel|-\ssolicitor)/im;
    const reservedDescription = [' of Christchurch', ', solicitor, Legal Services'];
    const result4 = parseAppearance1(result3, responseAppearancePattern3Custom1, 1, reservedDescription);
    const separators = [
        {
            firstSeparator: [' and '],
            firstSeparatorType: 1, // contain
            secondSeparator: [',', ' -'],
            secondSeparatorType: 3,
        },
        {
            firstSeparator: [','],
            firstSeparatorType: 3, // endsWith
        },
    ];
    const result4Custom1 = parseSeparator(result4, separators);
    mergeData(responseAppearanceNames, result4Custom1);

    //special logic, need further refactor for acc_1110153600000_2005NZACC68.pdf.txt
    if (responseAppearanceNames.length == 0) {
        const responseAppearancePattern4 = [/([a-zA-Z0-9\u00C0-\u02AB\s'(),.-]*)\s(Counsel for respondent)\n/im];
        const result4 = parse4(data, responseAppearancePattern4, 1);
        mergeData(responseAppearanceNames, result4);
    }
    return {
        responseAppearanceNames,
    };
};
