import {Group} from "./Group";

export interface User {
    id: number;
    uid: string;
    token: string;
    login: string;
    password: string;
    name: string;
    role:string;
    groups: Group[];
    isAdmin: boolean
}

