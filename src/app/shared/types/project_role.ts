export default interface ProjectRole {
    _id: string;
    projectId: string;
    userId: string;
    firstName: string;
    lastName: string;
    authorisedStatusIds: string[];
};