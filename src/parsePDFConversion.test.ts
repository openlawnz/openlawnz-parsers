/* global expect */

import { parseFromPDFJSConversion } from './parsePDFConversion';

import initFromPDFConversionSample from './testData/initFromConversion/initFromPDFConversion.sample.json';

describe('parseFromPDFJSConversion', () => {
    it('It should return a valid result', () => {
        const result = parseFromPDFJSConversion(initFromPDFConversionSample);
        expect(result.footnotes.length).toBeGreaterThan(0);
        expect(result.footnoteContexts.length).toBeGreaterThan(0);
        expect(result.caseText).not.toBe('');
    });
});
