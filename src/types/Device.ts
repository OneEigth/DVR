export interface Device {
    ID: number,
    UID: string,
    DID: string,
    groupUID: string,
    name: string,
    description: string,
    model: string,
    connectState: any,
    pulse_time: string,
    latitude: number,
    longitude: number,
    battery_percent: number,
    ownerUID: string,
    online: boolean
}