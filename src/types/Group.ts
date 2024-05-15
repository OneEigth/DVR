
export interface Group {
    id: number,
    uid: string,
    name: string,
    parent_uid: string,
    sub_groups: Group[]
}