export type Representation = {
    initiation: {
        party_type: string | null;
        names: string[];
        appearance: string[];
    };
    response: {
        party_type: string | null;
        names: string[];
        appearance: string[];
    };
};
