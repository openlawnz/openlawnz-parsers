# openlawnz-parsers

This package is used in the `openlawnz-pipeline` during pdf conversion.

It is standalone so that it can be versioned and others can easily work on it.

## Commands

    npm install
    npm build
    npm build:watch
    npm run test
    npm run test:coverage
    npm run lint

## Input

Input is a JSON file being the output of either:

-   PDF.js text output; or
-   Azure Cognitive Services OCR

See /testData/initFromConversion for an example input file
