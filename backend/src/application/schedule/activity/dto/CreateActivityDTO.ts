

export type CreateActivityInput = {
    title: string
    description: string
    startAt: Date
    endAt: Date
    location: string
    createdBy: string
}


export type CreateActivityOutput = {
    id: string;
};
