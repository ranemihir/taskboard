import Status from "./status";
import { User } from "./user";

export default interface Project {
    id: string;
    name: string;
    description: string;
    tasks: Task[];
    statuses: Status[];
    people: User[]
}