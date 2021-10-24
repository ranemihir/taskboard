import Project from "./project";
import Status from "./status";

export default interface ProjectRole {
    id: string;
    roleName: string;
    authorisedStatuses: Status[];
    project: Project;
}