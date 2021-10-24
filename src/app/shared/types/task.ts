import { User } from "./user";

export default interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: User;
    statusId: string;
    priority?: number;
    dueDate?: Date;
}