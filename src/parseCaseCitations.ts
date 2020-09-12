/*
    ********************
    PARSE CASE CITATIONS
    ********************
    Search through all cases and all citations
    Find all double citations in the full text of each case eg R v Smith [2012] NZHC 1234, [2012] 2 NZLR 123.
    Check to see if first part of match [2012] NZHC 1234 already exists in database
    If so, add second part of match to case_citation database with the same case id / file key as first one
*/

import { CaseCitation } from './types/CaseCitation';
import { regDoubleCites } from './utils/commonRegexes';

const commaOrSemi = /,|;/g;

function findCaseByCitation(allCitations: CaseCitation[], citation: string): CaseCitation {
    return allCitations.find(function (row: CaseCitation) {
        return row.citation.trim().toLowerCase() === citation.toLowerCase();
    });
}

export default (caseText: string, allCitations: CaseCitation[]): CaseCitation[] => {
    const citationRecordsToCreate: CaseCitation[] = [];
    // regex match for all double citations inside case text
    const citationsMatches = caseText.match(regDoubleCites);

    // TODO: Check necessity of all the conditions
    if (citationsMatches) {
        if (citationsMatches.length > 0) {
            for (const i in citationsMatches) {
                const citationsMatch = citationsMatches[i];
                // split into first and second citation
                const separatedCitations = citationsMatch.split(commaOrSemi);

                if (separatedCitations.length > 1) {
                    // separatedCitations[0] has first of double citation
                    // separatedCitations[1] has second of double citation
                    // we want to search for first citation to see if it is in the db already
                    const citation = separatedCitations[0];
                    const secondaryCitation = separatedCitations && separatedCitations[1].trim();

                    // TODO: Tidy up
                    if (citation && secondaryCitation) {
                        const foundCase = findCaseByCitation(allCitations, citation);
                        const foundSecondaryCase = findCaseByCitation(allCitations, secondaryCitation);
                        if (foundCase && !foundSecondaryCase) {
                            const citationId = secondaryCitation.replace(/(\[|\(|\]|\)|\/|\s|,)/g, ''); // Regex
                            // const citationId = uuidv4();

                            citationRecordsToCreate.push({
                                id: citationId,
                                citation: secondaryCitation,
                                fileKey: foundCase.fileKey,
                                caseDate: foundCase.caseDate,
                                year: foundCase.year,
                            });
                        }
                    }
                }
            }
        } else {
            //console.log("no matches")
        }
    }
    return citationRecordsToCreate;
};
