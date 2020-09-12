/**
 * @jest-environment node
 */

/* global expect */

import getVersion from './getVersion';

describe('getVersion', () => {
    it('Should return correct version', async () => {
        expect(getVersion()).toBe('1.0.0');
    });
});
