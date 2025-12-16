export type FlowColor = 'lime' | 'orange' | 'blue';

export interface Flow {
    id: string;
    name: string;
    description?: string;
    tags: string[];
    color: FlowColor;
    createdAt: Date;
}
