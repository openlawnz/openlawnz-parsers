import parseCaseToCase from './parseCaseToCase';

const allCitations = [
    {
        citation: '[2012] 1 NZLR 720',
        caseDate: '01-01-2012',
        fileKey: 'testFileKey2',
        id: 'testFileKey2',
        year: 2012,
    },
    {
        citation: '[2015] NZHC 2222',
        caseDate: '01-01-2013',
        fileKey: 'testFileKey3',
        id: 'testFileKey3',
        year: 2015,
    },
    {
        citation: '[2020] NZSC 3333',
        caseDate: '01-01-2020',
        fileKey: 'testFileKey4',
        id: 'testFileKey4',
        year: 2020,
    },
];

describe('Case To Case', () => {
    it('Testing case to case basic NZLR citation', () => {
        const caseText = `This case, testFileKey1 cites X v X [2012] 1 NZLR 720 which is testFileKey2`;
        const caseFileKey = `testFileKey1`;
        const result = parseCaseToCase(caseText, allCitations, caseFileKey);
        expect(result).toEqual({
            case_origin: 'testFileKey1',
            case_cites: [
                {
                    fileKey: 'testFileKey2',
                    count: 1,
                },
            ],
        });
    });

    it('Testing case to case basic neutral high court citation', () => {
        const caseText = `This case, testFileKey1 cites X v X [2015] NZHC 2222 which is testFileKey3`;
        const caseFileKey = `testFileKey1`;
        const result = parseCaseToCase(caseText, allCitations, caseFileKey);
        expect(result).toEqual({
            case_origin: 'testFileKey1',
            case_cites: [
                {
                    fileKey: 'testFileKey3',
                    count: 1,
                },
            ],
        });
    });

    it('Testing case to case basic supreme court citation and high court citation, in correct order', () => {
        const caseText = `This case, testFileKey1 cites X v X [2020] NZSC 3333 which is testFileKey4 and also X v X [2015] NZHC 2222 which is testFileKey3 `;
        const caseFileKey = `testFileKey1`;
        const result = parseCaseToCase(caseText, allCitations, caseFileKey);
        expect(result).toEqual({
            case_origin: 'testFileKey1',
            case_cites: [
                {
                    fileKey: 'testFileKey4',
                    count: 1,
                },
                {
                    fileKey: 'testFileKey3',
                    count: 1,
                },
            ],
        });
    });

    it('Testing case to case incrementing count', () => {
        const caseText = `This case, testFileKey1 cites X v X [2020] NZSC 3333 which is testFileKey4 and cites it again X v X [2020] NZSC 3333 so the count should be 2`;
        const caseFileKey = `testFileKey1`;
        const result = parseCaseToCase(caseText, allCitations, caseFileKey);
        expect(result).toEqual({
            case_origin: 'testFileKey1',
            case_cites: [
                {
                    fileKey: 'testFileKey4',
                    count: 2,
                },
            ],
        });
    });
});
