/* global expect */
import fs from 'fs';

import parseLocation from './parseLocation';

const cases = {
    case1: 'jdo_1404997201000_ec4145ad-2d29-4a23-ac25-9080c54d6b89.pdf',
};

describe(cases.case1, () => {
    const caseText = fs
        .readFileSync(`${__dirname}/testData/parseJudgesTestFiles/caseTexts/${cases.case1}.txt`)
        .toString();

    it('Location', async () => {
        const result = parseLocation(caseText);

        expect(result).toBe('NEW ZEALAND');
    });
});
