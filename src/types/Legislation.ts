export type Legislation = {
    extractionConfidence: number;
    fileKey: string;
    legislationReferences: {
        legislationId: string;
        groupedSections: {
            [key: string]: {
                id: string;
                count: number;
            };
        };
    }[];
};
