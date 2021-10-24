import { CurrentUser } from "./user";

export default interface AppState {
    currentUser: CurrentUser | null;
    error: string | null;
}