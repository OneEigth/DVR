
import {Device} from "./Device";

export interface Layout {
    id: number,
    uid: string,
    name: string,
    description:string,
    userUID: string,
    userName: string,
    viewType: string,
    devices: Device[]
}