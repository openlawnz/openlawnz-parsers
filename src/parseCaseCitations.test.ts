/* global expect */

import parseCaseCitations from './parseCaseCitations';
import fs from 'fs';
import { regNeutralCite } from './utils/commonRegexes';

const allCitations = [
    {
        citation: '[2012] 1 NZLR 720',
        caseDate: '01-01-2012',
        fileKey: 'test_1111',
        id: 'test_1111',
        year: 2012,
    },
    {
        citation: '[2015] NZHC 2222',
        caseDate: '01-01-2013',
        fileKey: 'test_2222',
        id: 'test_2222',
        year: 2015,
    },
    {
        citation: '[2020] NZSC 3333',
        caseDate: '01-01-2020',
        fileKey: 'test_3333',
        id: 'test_3333',
        year: 2020,
    },
];

describe('Case Citations', () => {
    it('Testing neutral citation regex - match on each type of neutral', () => {
        const caseText = fs.readFileSync(`${__dirname}/testData/caseCitations/caseCitations.txt`).toString();

        let neutralCitations = caseText.match(regNeutralCite);
        // remove errant line breaks
        neutralCitations = neutralCitations.map((x) => {
            return x.replace(/\n/g, ' ');
        });
        // make sure each type of neutral citation will return (non-pinpoint at this stage)
        const neutralArray = [
            '[2012] NZHC 507',
            '[2012] NZDC 12',
            '[2012] NZCA 12',
            '[2012] NZSC 12',
            '[2012] NZEnvC 13',
            '[2012] NZEmpC 13',
            '[2012] NZACA 13',
            '[2012] NZBSA 13',
            '[2012] NZCC 13',
            '[2012] NZCOP 13',
            '[2012] NZCAA',
            '[2012] NZDRT 13',
            '[2012] NZHRRT 13',
            '[2012] NZIACDT 13',
            '[2012] NZIEAA 13',
            '[2012] NZLVT 13',
            '[2012] NZLCDT 13',
            '[2012] NZLAT 13',
            '[2012] NZSHD 13',
            '[2012] NZLLA 13',
            '[2012] NZMVDT 13',
            '[2012] NZPSPLA 13',
            '[2012] NZREADT 13',
            '[2012] NZSSAA 13',
            '[2012] NZTRA 13',
        ];
        expect(JSON.stringify(neutralCitations)).toEqual(JSON.stringify(neutralArray));
    });

    it('Test double citation with neutral citation as second citation', () => {
        const caseJSON = {
            fileKey: 'input_case_text',
            caseText: `Schmuck v Rashbrooke blah blah New Zealand Health Practitioners disciplinary Tribunal 200/Nur09/139P, 28 April 2010; Wallace, New Zealand Health Practitioners Disciplinary Tribunal 221/Nur08/110P, 28 April 2009 at 84 ­ though there the Tribunal refers to the functions rather than guideline objectives. Refer also A v Professional Conduct Committee HC Auckland CIV 20-08-404-2927, 5 September 2008; Dentice v The Valuers Registration Board [2012] 1 NZLR 720, [2012] NZHC 1234; J v Director of Proceedings HC Auckland CIV 2006-404-2186, 17 October 2006; Patel v Complaints Assessment Committee HC Auckland CIV 2007-404-1818, 13 August 2007; Taylor v General Medical Council [1990] 2 All ER 263; Ziderman v General Dental Council [1976] 2 All ER 344.  A v Professional Conduct Committee HC Auckland CIV 2008-404-2927, 5 September 2008`,
        };

        const result = parseCaseCitations(caseJSON.caseText, allCitations);

        expect(result.find((r) => r.citation === '[2012] NZHC 1234')).not.toBeUndefined();
    });

    it('Test double citation with law report as second citation', () => {
        const caseJSON = {
            fileKey: 'input_case_text_2',
            caseText: `Smith v Smith lorem ipsum lorem ipsum Clayton v Clayton [2015] NZHC 2222, [2015] 1 NZLR 112 lorem ipsum`,
        };

        const result = parseCaseCitations(caseJSON.caseText, allCitations);

        expect(result.find((r) => r.citation === '[2015] 1 NZLR 112')).not.toBeUndefined();
    });
});
