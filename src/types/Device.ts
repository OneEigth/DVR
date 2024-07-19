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
    ownerUID: string,
    ownerName: string,
    online: boolean,
    battery_level: number,
    signal_level: number,
    memory:{
        available:string,
        total:string,
        used:string
    }
    storageInfo: {
        external: number,
        externalUsed: number,
        internal: number,
        internalUsed: number
    }
}