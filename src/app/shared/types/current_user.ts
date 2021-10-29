export interface CurrentUserProjectRole {
    projectId: string;
    authorisedStatusIds: string[];
}

export interface CurrentUser {
    _id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    token: string | null;
    projectRoles: CurrentUserProjectRole[];
};