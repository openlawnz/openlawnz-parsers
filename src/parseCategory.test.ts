/* global expect */

import parseCategory from './parseCategory';
import courts from './dataDefinitions/courts.json';
import lawReports from './dataDefinitions/lawReports.json';

describe('parseCategory', () => {
    it('It should get acc category from data source', () => {
        const result = parseCategory('acc', null, null);
        expect(result).toEqual({ id: 'acc', name: 'acc' });
    });

    it('It should get family category from court', () => {
        const result = parseCategory(
            null,
            courts.find((c) => c.id === 'family-court'),
            null,
        );
        expect(result).toEqual({ id: 'family', name: 'Family' });
    });

    it('It should get family category from law report', () => {
        const result = parseCategory(
            null,
            null,
            lawReports.find((c) => c.id === 'family-reports-of-new-zealand'),
        );
        expect(result).toEqual({ id: 'family', name: 'Family' });
    });
});
