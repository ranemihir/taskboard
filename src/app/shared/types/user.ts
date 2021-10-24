import ProjectRole from "./project_role";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
}

export interface CurrentUser extends User {
	email: string;
	accessToken: string;
	projectRoles?: ProjectRole[];
}