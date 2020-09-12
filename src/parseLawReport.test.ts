import parseLawReport from './parseLawReport';
import allLawReports from './dataDefinitions/lawReports.json';

describe('Law reports', () => {
    it('Testing law reports', () => {
        const caseCitations = [
            {
                citation: '[2020] 1 NZFLR 1',
                caseDate: '01-01-2020',
                fileKey: 'test_1',
                id: 'test_31',
                year: 2020,
            },
        ];
        const result = parseLawReport(allLawReports, caseCitations);
        expect(result).toEqual({
            acronym: 'NZFLR',
            category: 'Family',
            id: 'new-zealand-family-law-reports',
            name: 'New Zealand Family Law Reports',
        });
    });
});
