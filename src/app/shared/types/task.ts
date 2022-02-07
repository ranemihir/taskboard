export default interface Task {
    _id: string;
    projectId: string;
    title: string;
    description?: string;
    assignedTo?: string;
    status: number;
    priority?: number;
    dueDate?: Date;
    tags?: string[];
}