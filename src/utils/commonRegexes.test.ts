/* global expect */
import { regDoubleCites, regNeutralCite, regNeutralCitation, citation_reg } from './commonRegexes';

describe('Regex match for double citations', () => {
    // should give single group match for any string that looks like two citations

    test('With a semicolon', () => {
        const result = '(2015) 1 NZLR 1234; [2015] NZCA 5123'.match(regDoubleCites);

        expect(result).toHaveLength(1);
    });

    test('With a comma', () => {
        const result = '(2015) 1 NZLR 1234, [2015] NZCA 5123'.match(regDoubleCites);

        expect(result).toHaveLength(1);
    });

    test('Neutral then law report instead of law report then neutral', () => {
        const result = '[2015] NZCA 5123, (2015) 1 NZLR 1234'.match(regDoubleCites);

        expect(result).toHaveLength(1);
    });

    test('Fails without comma or semicolon', () => {
        const result = '(2015) 1 NZLR 1234 [2015] NZCA 5123'.match(regDoubleCites);

        expect(result).toBeNull();
    });
});

describe('Regex match for strict neutral citation', () => {
    // strict neutral citations only
    // known court identifiers only - no law reports
    // includes trailing integer
    // square brackets required

    test('Basic netural court of appeal', () => {
        const result = '[2015] NZCA 5123'.match(regNeutralCite);

        expect(result).toHaveLength(1);
    });

    test('Basic netural high court', () => {
        const result = '[2012] NZHC 1234'.match(regNeutralCite);

        expect(result).toHaveLength(1);
    });

    test('Fails if no square brackets', () => {
        const result = '(2012) NZHC 1234'.match(regNeutralCite);

        expect(result).toBeNull();
    });

    test('Fails if number between year and court', () => {
        const result = '[2012] 1 NZHC 1234'.match(regNeutralCite);

        expect(result).toBeNull();
    });

    test('Fails on invalid identifier', () => {
        const result = 'Smith v Smith [2005] ABCD 545'.match(regNeutralCite);

        expect(result).toBeNull();
    });

    test('Works with Tenancy cases', () => {
        const result = '\n__________________________________________________________________________________\n4233536 1\n\n[2020] NZTT Christchurch 4233536 \n\nTENANCY TRIBUNAL AT Christchurch\n\nAPPLICANT: FOUR SEASONS REALTY 2017 LIMITED trading as Harcourts \nRangiora and North and South Innovations Ltd \n\nLandlord \n\nRESPONDENT: Bonnie Cherie Montgomery, Anthony Peter Chamberlain\n\nTenant and Guarantor \n\nTENANCY ADDRESS: 17 Ormandy Court, Amberley, Amberley 7410\n\nORDER\n\n1. The application is dismissed.\n\nREASONS:\n\n1. The landlord applies to the Tribunal for an order that the tenant pay costs associated \nwith methamphetamine testing and decontamination in the tenancy. The tenant \nstrongly denies that methamphetamine was used during the tenancy, and opposes \nliability for the claim.\n\nBackground\n\n2. I summarise the background as follows:\n\na. The sole tenant is Bonnie Montgomery, the guarantor of the tenancy is Peter \nChamberlain'.match(
            regNeutralCite,
        );

        expect(result[0]).toMatch('[2020] NZTT Christchurch 4233536');
    });
});

describe('Regex match for getting year from citations', () => {
    // should allow determination of year reliably (year followed by court identifier)
    // should exclude trailing integer(s)
    // including law reports (but shouldn't)
    // square or round brackets

    test('Correct string returned with square brackets', () => {
        const result = 'Smith v Smith [2015] NZCA 5123'.match(regNeutralCitation);

        expect(result[0]).toMatch('[2015] NZCA');
    });

    test('Round brackets allowed', () => {
        const result = 'Smith v Smith (2015) NZCA 5123'.match(regNeutralCitation);

        expect(result[0]).toMatch('(2015) NZCA');
    });

    test('Year in [2] of regex matches', () => {
        const result = 'EA v RENNIE COX LAWYERS NO 2 [2020] NZHC 958 [12 May 2020]'.match(regNeutralCitation);

        expect(result[2]).toMatch(/\d{4}/);
    });

    test('Full title string returns array with 6 capturing groups', () => {
        const result = 'EA v RENNIE COX LAWYERS NO 2 [2020] NZHC 958 [12 May 2020]'.match(regNeutralCitation);

        expect(result).toHaveLength(7);
    });

    test('Fails if identifier is NZLR', () => {
        const result = 'EA v RENNIE COX LAWYERS NO 2 [2020] NZLR 958 [12 May 2020]'.match(regNeutralCitation);

        expect(result).toBeNull();
    });
});

describe('Medium wide citation matching', () => {
    // semi-wide capturing citation
    // capture neutral citations but not law reports as it excludes issue number [year] issuenumber journal integer
    // should obtain most neutral citations but will pick up false positives and typos - NOT LIMITED TO KNOWN IDENTIFIERS
    // four digits in square brackets, 7 letters, 1-6 anything

    test('Matches basic', () => {
        const result = 'dasf afd Smith v Smith [2015] NZCA 5123 adfa df'.match(citation_reg);

        expect(result[0]).toMatch('[2015] NZCA');
    });

    test('Fails on law report', () => {
        const result = 'Smith v Smith (1995) 1 NZLR 54'.match(citation_reg);

        expect(result).toBeNull();
    });

    test('Matches even on invalid identifier', () => {
        const result = 'xcza dfSmith v Smith [2005] ABCD 545 a df a'.match(citation_reg);

        expect(result).toHaveLength(1);
    });
});
