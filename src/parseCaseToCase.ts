/*
    ********************
    PARSE CASE TO CASE
    ********************
    Search through all cases and all citations
    For each citation that exists in the database, search through each case text to see if its there
    If so, return case cited object
*/

import { CaseCitation } from './types/CaseCitation';
import { citation_reg } from './utils/commonRegexes';

export default (
    caseText: string,
    allCitations: CaseCitation[],
    caseFileKey: string,
): {
    case_origin: string;
    case_cites: {
        fileKey: string;
        count: number;
    }[];
} => {
    const matches = caseText.match(citation_reg);
    // create map entry with key as the ID, all citations as body
    if (matches) {
        const mapped_count = {};
        // loop over all citations within keyed case text
        matches.forEach((caseCitation) => {
            allCitations.forEach(function (citationRow) {
                // match against caseRow.case_text, and only match if the ids are not identical (dont need to add a case's reference to itself)
                if (citationRow.citation) {
                    caseCitation = caseCitation.slice(0, -1);
                    caseCitation += ';';
                    //remove white space(could be inconsistent)
                    caseCitation = caseCitation.replace(/\s/g, '');

                    // if the citation is a substring of multiple other cases, we need to account for this by "ending"
                    // the citation with a semicolon ;
                    let w = citationRow.citation.concat(';');
                    w = w.replace(/\s/g, '');

                    // map the count udner its case_id - can add to this if it encounters this ID again
                    if (caseCitation.indexOf(w) !== -1 && citationRow.fileKey != caseFileKey) {
                        if (mapped_count[citationRow.fileKey]) {
                            mapped_count[citationRow.fileKey] += 1;
                        } else {
                            mapped_count[citationRow.fileKey] = 1;
                        }
                        /**
                         * here, we need to check for duplicates already in the case_to_case table?
                         * the script will likely be run regularly across the whole db (to account for new citations being added)
                         * this will result in duplicate entries
                         * UPDATE: put a key on (case_id_1, case_id_2)
                         */
                    }
                }
            });
        });

        return {
            case_origin: caseFileKey,
            case_cites: Object.keys(mapped_count).map((k) => ({
                fileKey: k,
                count: mapped_count[k],
            })),
        };
    }
};
