import { ProjectRole } from ".";

export default interface CurrentUser {
    _id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    token: string | null;
    projectRoles: ProjectRole[];
};