/**
 * @jest-environment node
 */

/* global expect */

import { convertPDFURLWithPDFJS } from './convertPDFURL';

describe('convertPDFWithPDFJS', () => {
    it('Does not process urls with govt.nz', async () => {
        await expect(convertPDFURLWithPDFJS('https://www.openlaw.nz/file.govt.nz')).rejects.toEqual(
            new Error('Cannot use NZ Govt or NZlii URLs'),
        );
    });

    it('Does not process urls with nzlii.org files', async () => {
        await expect(convertPDFURLWithPDFJS('https://www.openlaw.nz/file.nzlii.org')).rejects.toEqual(
            new Error('Cannot use NZ Govt or NZlii URLs'),
        );
    });

    it('Throws an error when URL does not exist', async () => {
        await expect(
            convertPDFURLWithPDFJS(
                'https://openlawnz-pdfs-dev.s3-ap-southeast-2.amazonaws.com/jdo_1376398801000_4ffaed38-cd90-4488-a5da-8b1c61829c5ew.pdf',
            ),
        ).rejects.toEqual(new Error('Invalid PDF structure.'));
    });

    it('Loads a PDF', async () => {
        const pages = await convertPDFURLWithPDFJS(
            'https://openlawnz-pdfs-dev.s3-ap-southeast-2.amazonaws.com/jdo_1376398801000_4ffaed38-cd90-4488-a5da-8b1c61829c5e.pdf',
        );
        expect(pages.length).toBe(8);
    });
});
