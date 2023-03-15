export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status:  EntryStatus
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished'

export interface EntryDeletedResponse {
    message: string;
    deleted: Entry;
}
export interface EntryUpdatedResponse {
    message: string;
    updated: Entry;
}