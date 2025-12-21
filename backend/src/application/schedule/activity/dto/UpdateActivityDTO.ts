export type UpdateActivityInput = {
    id: string;
    title?: string;
    description?: string | null;
    startAt?: Date;
    endAt?: Date;
    location: string;
};

export type UpdateActivityOutput = {
    id: string;
};
