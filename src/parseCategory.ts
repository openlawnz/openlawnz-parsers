// Currently only associates category "acc" with case if source of case was from ACC
// TODO: expand to other categories and sources

import { Category } from './types/Category';
import { LawReport } from './types/LawReport';
import { Court } from './types/Court';

const makeFriendly = (str: string) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};

export default (fileProvider: string, court: Court, lawReport: LawReport): Category | null => {
    let categoryName: string;

    if (fileProvider == 'acc') {
        categoryName = 'acc';
    } else if (court && court.category) {
        categoryName = court.category;
    } else if (lawReport && lawReport.category) {
        categoryName = lawReport.category;
    }

    if (categoryName) {
        return {
            id: makeFriendly(categoryName),
            name: categoryName,
        };
    }

    return;
};
