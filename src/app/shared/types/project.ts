export default interface Project {
    _id: string;
    name: string;
    description?: string;
    adminUserIds: string[];
    invites?: string[];
};