export default interface ProjectRole {
    _id: string;
    projectId: string;
    userId: string;
    authorisedStatusIds: string[];
};