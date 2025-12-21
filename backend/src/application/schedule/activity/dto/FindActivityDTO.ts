export type FindActivityInput = {
    id: string;
};

export type FindActivityOutput = {
    id: string;
    title: string;
    description: string | null;
    startAt: Date;
    endAt: Date;
    location: string | null;
    createdBy: string;
    status: string;
};
