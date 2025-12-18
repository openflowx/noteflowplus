export interface Flow {
    id: string;
    userId: string;
    title: string;
    description?: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
