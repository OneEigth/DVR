
export interface File{
    id: number,
    UID: string,
    deviceUID: string,
    deviceDID: string,
    groupUID: string,
    ownerUID: string,
    rating: number,
    name: string,
    size: number,
    start: string
    end: string,
    duration: number,
    downloaded: boolean,
    storagePath: string,
    previewPath: string,
    tryDownloadCount: number,
    fileType: string,
    caseNumber: number,
    caseDescription: string
}