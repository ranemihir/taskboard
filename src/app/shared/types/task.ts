export default interface Task {
    _id: string;
    title: string;
    description?: string;
    assignedTo?: string;
    statusId: string;
    priority?: number;
    dueDate?: Date;
}