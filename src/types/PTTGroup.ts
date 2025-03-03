import {User} from "./User";
import {Device} from "./Device";

export interface PTTGroup {
    id?: string;
    uid: string;
    name: string;
    userUID: string;
    user: User;
    devices?: Device[];
}