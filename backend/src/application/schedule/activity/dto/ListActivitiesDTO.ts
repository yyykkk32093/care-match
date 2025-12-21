export type ListActivitiesInput = {
    // 現時点では filter 無しだが将来用に残す
};

export type ListActivitiesOutput = Array<{
    id: string;
    title: string;
    description: string | null;
    startAt: Date;
    endAt: Date;
    location: string | null;
    createdBy: string;
    status: string;
}>;
