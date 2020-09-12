import { CaseCitation } from './types/CaseCitation';
import { LawReport } from './types/LawReport';

const parseLawReport = (lawReports: LawReport[], caseCitations: CaseCitation[]): LawReport => {
    if (caseCitations[0]) {
        const foundLawReport = lawReports.find((l) => caseCitations[0].citation.indexOf(l.acronym) !== -1);

        if (foundLawReport) {
            return foundLawReport;
        }
    }
};

export default parseLawReport;
