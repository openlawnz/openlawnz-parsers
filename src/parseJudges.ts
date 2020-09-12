/**
 * ********************
 * PARSE JUDGES
 * ********************
 * This parser attempts to find what judge or judges decided a case and the relevant judge titles
 * A case can have multiple judges
 * Judges have titles (eg "Judge", "Chief Justice") and may have multiple titles over a career. A judge titles object must be passed in to this parser so that it knows what titles to look for.
 */

import { parse } from './utils/parseUtility';
import { associateJudgePattern } from './parseJudges/parseAssociateJudge';
import { chiefJusticePattern } from './parseJudges/parseChiefJustice';
import { presidentPattern } from './parseJudges/parsePresident';
import parseDoubleJustice from './parseJudges/parseDoubleJustice';
import parseJustice from './parseJudges/parseJustice';
import parseJudge from './parseJudges/parseJudge';
import { Judge } from './types/Judge';
type ParseJudgesArgs = {
    judgeTitles;
    fileKey: string;
    caseText: string;
};
export default ({ judgeTitles, fileKey, caseText }: ParseJudgesArgs): Judge[] => {
    const judgeTitleKeys = Object.keys(judgeTitles);
    const caseId = fileKey;
    const parsedResult = new Map();

    //help method for insert value into result list
    function insertResult(judgeName, caseID: string, titleID: string) {
        if (judgeTitleKeys.indexOf(titleID) === -1) {
            console.log('Invalid titleID', titleID);
            return;
        }

        if (!parsedResult.has(judgeName)) {
            parsedResult.set(judgeName, [[caseID], titleID]);
        } else {
            const casesApper = parsedResult.get(judgeName)[0];
            if (!casesApper.includes(caseID)) casesApper.push(caseID);
            const titles = parsedResult.get(judgeName)[1];
            if (!titles.includes(titleID)) titles.push(titleID);
            parsedResult.set(judgeName, [casesApper, titles]);
        }
    }

    function parseResult(result, caseId, judgeTitle) {
        if (result != undefined && result != null && result.value != undefined && result.value != null) {
            const resultLength = result.value.length;
            for (let i = 0; i < resultLength; i++) {
                insertResult(result.value[i], caseId, judgeTitle);
            }

            if (resultLength > 0) return true;
        }
        return false;
    }

    function parseCommonJudge(data, pattern, caseId, judgeTitle) {
        const result = parse(data, pattern);
        return parseResult(result, caseId, judgeTitle);
    }

    parseCommonJudge(caseText, chiefJusticePattern, caseId, 'chief-justice');
    parseCommonJudge(caseText, presidentPattern, caseId, 'president');
    parseResult(parseJudge(caseText), caseId, 'judge');
    parseResult(parseDoubleJustice(caseText, judgeTitles), caseId, 'justice');
    parseResult(parseJustice(caseText, judgeTitles), caseId, 'justice');
    parseCommonJudge(caseText, associateJudgePattern, caseId, 'associate-judge');

    const caseJudges: Judge[] = [];
    parsedResult.forEach((value, key) => {
        caseJudges.push({
            title_id: value[1],
            name: key,
        });
    });

    return caseJudges;
};
