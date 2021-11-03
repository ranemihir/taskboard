export default interface Task {
    _id: string;
    projectId: string;
    title: string;
    description?: string;
    assignedTo?: string;
    statusId: string;
    priority?: number;
    dueDate?: Date;
    tags?: string[];
}