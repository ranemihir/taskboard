export default interface Project {
    _id: string;
    name: string;
    description?: string;
    adminUserIds: string[];
    invites?: string[];
    statuses?: Status[];
};

interface Status {
    _id: string;
    name: string;
}