export interface Device {
    ID: number,
    UID: string,
    DID: string,
    groupUID: string,
    groupName:string,
    name: string,
    description: string,
    model: string,
    connectionState: any,
    pulse_time: string,
    latitude: number,
    longitude: number,
    battery_percent: number,
    ownerUID: string,
    online: boolean,
    memory:{
        available:string,
        total:string,
        used:string
    }
}