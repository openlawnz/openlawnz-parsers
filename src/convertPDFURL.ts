import pdfjsLib from 'pdfjs-dist/es5/build/pdf.js';

export type PDFJSConversionPage = {
    items: {
        str: string;
        dir: string;
        width: number;
        height: number;
        transform: number[];
        fontName: string;
    }[];
    styles: {
        [key: string]: {
            fontFamily: string;
            ascent: number;
            descent: number;
            vertical: boolean;
        };
    };
};

const convertPDFURLWithPDFJS = async (pdfURL: string): Promise<PDFJSConversionPage[]> => {
    if (pdfURL.indexOf('govt.nz') !== -1 || pdfURL.indexOf('nzlii.org') !== -1) {
        throw new Error('Cannot use NZ Govt or NZlii URLs');
    }

    const pages = [];
    const loadingTask = pdfjsLib.getDocument(pdfURL);
    const doc = await loadingTask.promise;
    const numPages = doc.numPages;

    for (let i = 0; i < numPages; i++) {
        const page = await doc.getPage(i + 1);
        const textContent = await page.getTextContent();
        pages.push(textContent);
    }

    return pages;
};

const convertPDFURLWithAzureOCRConfiguration = {
    CognitiveServicesVersion: '3.0-preview',
};

export { convertPDFURLWithPDFJS, convertPDFURLWithAzureOCRConfiguration };
