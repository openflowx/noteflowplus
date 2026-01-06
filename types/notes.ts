export interface Note {
    id: string;
    flowId: string;
    title: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
}