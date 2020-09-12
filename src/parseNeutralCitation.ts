import { CaseCitation } from './types/CaseCitation';
import { regNeutralCite, regNeutralCitation } from './utils/commonRegexes';

export type NeutralCitationArgs = { caseCitations: string[]; caseText: string; caseDate: string; fileKey: string };

export default ({ caseCitations, caseText, caseDate, fileKey }: NeutralCitationArgs): CaseCitation[] => {
    let retCaseCitations: CaseCitation[];

    // if there's no caseCitations array (even if empty) then the input object is invalid
    if (!caseCitations) {
        console.error('No citations array');
    }

    // Neutral citation
    // If there's no citations, then find one in the text and make an array
    else if (caseCitations.length === 0) {
        const subset = caseText.substr(0, 550);

        const citation = subset.match(regNeutralCite);
        // for now, limit to the first citation found (in case double citation appears in header - deal with double citations in header later)
        if (citation && citation[0]) {
            caseCitations = [citation[0]];
        }

        //else if the regNeutralCite didnt work use regOtherCitation()

        //else if still nothing, then move on (error)
    }

    if (caseCitations.length === 0) {
        throw new Error('No caseCitations in array');
    } else {
        retCaseCitations = caseCitations.map((c) => {
            const citationId = c.replace(/[^a-zA-Z\d-]/g, ''); // Regex

            // Convert to object

            const matches = c.match(regNeutralCitation);

            const citationObj: CaseCitation = {
                id: citationId,
                citation: c,
                fileKey,
                caseDate,
                year: matches && matches[2] ? parseInt(matches[2]) : parseInt(caseDate.toString().substr(0, 4)),
            };

            return citationObj;
        });
    }

    return retCaseCitations;
};
